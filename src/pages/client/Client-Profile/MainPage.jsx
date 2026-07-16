import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiEdit,
  FiMapPin,
  FiUser,
  FiTool,
  FiBarChart2,
  FiAward,
  FiAlertCircle,
} from 'react-icons/fi';
import { getMyProfile, updateMyProfile } from '../../../api/clientService';

const MainPage = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', address: '', image: null, imagePreview: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        const data = res.data?.data ?? res.data;
        setProfile(data);
        setEditForm({
          firstName: data?.firstName ?? '',
          lastName: data?.lastName ?? '',
          address: data?.address ?? '',
          image: null,
          imagePreview: data?.profileImageUrl ?? '',
        });
      })
      .catch((err) => setError(err.message || 'فشل تحميل الملف الشخصي'))
      .finally(() => setLoading(false));
  }, []);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditForm((f) => ({ ...f, image: file, imagePreview: URL.createObjectURL(file) }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveError(null);
      const formData = new FormData();
      formData.append('firstName', editForm.firstName);
      formData.append('lastName', editForm.lastName);
      formData.append('address', editForm.address);
      if (editForm.image) formData.append('profileImage', editForm.image);

      const res = await updateMyProfile(formData);
      const updated = res.data?.data ?? res.data;
      setProfile((prev) => ({ ...prev, ...updated }));
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.message || 'فشل حفظ البيانات');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <span className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50" dir="rtl">
        <div className="flex flex-col items-center gap-3 text-center">
          <FiAlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-red-500 font-bold">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold">إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  const displayName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || profile.fullName || 'عميل'
    : '—';
  const imageUrl = isEditing ? editForm.imagePreview : (profile?.profileImageUrl ?? '');

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-3 sm:p-6 lg:p-8 font-sans overflow-x-hidden" dir="rtl">

      {/* Profile Header Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 shadow-sm mb-6 relative">

        {/* Action Buttons */}
        <div className="flex justify-start sm:absolute sm:top-6 sm:left-6 mb-6 sm:mb-0 w-full sm:w-auto">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <FiEdit className="w-3.5 h-3.5" />
              <span>تعديل الحساب</span>
            </button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto justify-start flex-wrap">
              {saveError && <p className="w-full text-xs text-red-500 font-bold text-right">{saveError}</p>}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'حفظ'}
              </button>
              <button
                onClick={() => { setIsEditing(false); setSaveError(null); }}
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center"
              >
                إلغاء
              </button>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center justify-center text-center mt-2 sm:mt-0">
          <div className="w-24 h-24 rounded-full bg-slate-200 relative border-2 border-white shadow-md mb-4 group overflow-hidden">
            <div className="absolute inset-0 bg-slate-400 rounded-full flex items-center justify-center text-white text-3xl">
              <FiUser />
            </div>
            {imageUrl && (
              <img src={imageUrl} alt={displayName} className="w-full h-full object-cover rounded-full relative z-10" onError={(e) => { e.target.style.display = 'none'; }} />
            )}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center border-2 border-white z-20">✓</span>
            {isEditing && (
              <label className="absolute inset-0 bg-black/50 rounded-full z-30 flex items-center justify-center text-white text-[10px] cursor-pointer font-bold">
                <span>تغيير</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-2 mb-2 w-full max-w-xs justify-center">
              <input
                type="text"
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                placeholder="الاسم الأول"
                className="text-center border border-blue-300 rounded-lg px-3 py-1 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 w-1/2"
              />
              <input
                type="text"
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                placeholder="اسم العائلة"
                className="text-center border border-blue-300 rounded-lg px-3 py-1 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 w-1/2"
              />
            </div>
          ) : (
            <h1 className="text-xl font-bold text-slate-800 mb-2 break-all px-4">{displayName}</h1>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-400 font-medium justify-center w-full">
            <FiMapPin className="w-3.5 h-3.5 shrink-0" />
            {isEditing ? (
              <input
                type="text"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                placeholder="العنوان"
                className="text-center border border-blue-300 rounded-md px-2 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 w-full max-w-[180px]"
              />
            ) : (
              <span className="break-all px-2">{profile?.address ?? profile?.city ?? '—'}</span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center sm:justify-end mt-8 border-t border-gray-100 pt-4 -mx-5 sm:-mx-8 px-5 sm:px-8">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none py-2 px-5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 bg-white text-blue-600 shadow-sm whitespace-nowrap">
              <FiUser className="w-3.5 h-3.5" /><span>الملف الشخصي</span>
            </button>
            <button
              onClick={() => navigate('/client/projects')}
              className="flex-1 sm:flex-none py-2 px-5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 text-gray-500 hover:text-gray-700 whitespace-nowrap"
            >
              <FiTool className="w-3.5 h-3.5" /><span>المشاريع</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-4 order-2 lg:order-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">الإحصائيات</h3>
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                <FiBarChart2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span className="text-blue-600">{profile?.completionRate ?? 0}%</span>
                <span className="text-gray-400">إكمال المشاريع</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${profile?.completionRate ?? 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span className="text-blue-600">{profile?.rehireRate ?? 0}%</span>
                <span className="text-gray-400">إعادة التوظيف</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${profile?.rehireRate ?? 0}%` }} />
              </div>
            </div>
          </div>
          <div className="bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white flex items-center justify-between shadow-md">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <FiAward className="w-5 h-5" />
            </div>
            <div className="text-left flex-1 pl-4">
              <span className="text-[10px] text-blue-100 block tracking-wider uppercase mb-0.5">الشارة</span>
              <h4 className="text-base font-bold">{profile?.badge ?? 'عميل مميز'}</h4>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 border-b border-gray-50 pb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <FiUser className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">معلومات الحساب</h2>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 leading-relaxed space-y-3 font-medium" dir="rtl">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400">الاسم الكامل</span>
                <span className="font-bold text-slate-700">{displayName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400">البريد الإلكتروني</span>
                <span className="font-bold text-slate-700">{profile?.email ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400">رقم الهاتف</span>
                <span className="font-bold text-slate-700">{profile?.phoneNumber ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">العنوان</span>
                <span className="font-bold text-slate-700">{profile?.address ?? profile?.city ?? '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainPage;