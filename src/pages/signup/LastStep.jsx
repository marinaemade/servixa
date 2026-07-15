import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNavbar from './../../components/layout/auth-navbar/AuthNavbar';
import {
  MapPinIcon,
  CameraIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  PhotoIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useSignup } from '../../context/SignupContext';
import api from '../../api/api';

const LastStep = () => {
  const navigate = useNavigate();
  const { data, updateSignup, resetSignup } = useSignup();

  // Bio / skills / portfolio are kept as UI-only for now — there's no backend
  // only accepts FirstName/LastName/Email/PhoneNumber/Password/Latitude/
  // Longitude/NationalIdFront/NationalIdBack/ProfilePicture). They'll be easy
  // to wire up once a "complete worker profile" endpoint exists.
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState(['تركيب خلاطات', 'تسليك مواسير']);
  const [skillInput, setSkillInput] = useState('');
  const [portfolio, setPortfolio] = useState([
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&q=80',
  ]);
  const portfolioInputRef = useRef();

  const [profilePhotoFile, setProfilePhotoFile] = useState(data.profilePicture);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const profileInputRef = useRef();

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      setProfilePhotoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill) =>
    setSkills(skills.filter((s) => s !== skill));

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
  };

  const handlePortfolioAdd = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPortfolio([...portfolio, ...urls]);
  };

  const removePortfolio = (index) =>
    setPortfolio(portfolio.filter((_, i) => i !== index));

  // Build a single-line address out of the regions collected in ScopeOfWork,
  // used as the "defaultAddress" field for client registration.
  const buildAddressFromRegions = () => {
    const first = data.regions?.[0];
    if (!first) return '';
    return [first.governorate, first.city].filter(Boolean).join('، ');
  };

  const registerAsWorker = async () => {
    if (!data.nationalIdFront || !data.nationalIdBack) {
      setError('الرجاء إكمال خطوة توثيق الهوية أولاً');
      navigate('/verification');
      return false;
    }

    const formData = new FormData();
    formData.append('FirstName', data.firstName);
    formData.append('LastName', data.lastName);
    formData.append('Email', data.email);
    formData.append('PhoneNumber', data.phone);
    formData.append('Password', data.password);
    // No geolocation collected — backend defaults these to 0 when omitted.
    formData.append('Latitude', 0);
    formData.append('Longitude', 0);
    formData.append('NationalIdFront', data.nationalIdFront);
    formData.append('NationalIdBack', data.nationalIdBack);
    formData.append('ProfilePicture', profilePhotoFile);

    await api.post('/Auth/register-worker', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return true;
  };

  const registerAsClient = async () => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
      defaultAddress: buildAddressFromRegions(),
      // No geolocation collected — backend defaults these to 0 when omitted.
      latitude: 0,
      longitude: 0,
    };

    await api.post('/Auth/register-client', payload);
    return true;
  };

  const handleSave = async () => {
    setError('');

    if (!profilePhotoFile) {
      setError('الرجاء رفع صورة الحساب الشخصية أولاً للاستمرار');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!data.role) {
      setError('لم يتم تحديد نوع الحساب، الرجاء البدء من جديد');
      navigate('/account-type');
      return;
    }

    setSubmitting(true);
    try {
      if (data.role === 'provider') {
        const ok = await registerAsWorker();
        if (!ok) return; // navigated away already (missing ID docs)

        resetSignup();
        navigate('/login', {
          state: {
            message:
              'تم إرسال طلب انضمامك بنجاح، سيراجع فريقنا بياناتك وستصلك رسالة عند الموافقة',
          },
        });
      } else {
        await registerAsClient();

        resetSignup();
        navigate('/login', {
          state: { message: 'تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن' },
        });
      }
    } catch (err) {
      console.error('registration failed:', err?.response?.status, err?.response?.data);
      setError(err.message || 'حدث خطأ أثناء إرسال طلبك، حاول مرة أخرى');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-28 sm:pb-24" dir="rtl">
      <AuthNavbar/>
      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-24 pb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 text-right mb-1">
          تجهيز ملفك الاحترافي
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm text-right">
          أنت على بعد خطوة واحدة من استقبال أول عميل لك. دعنا نبني واجهتك الرقمية.
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* ── LEFT COLUMN (col-span-2) ── */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5 order-2 lg:order-1">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-3xl font-bold text-sm text-center">
              {error}
            </div>
          )}

          {/* بنبذة عني */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-extrabold text-gray-800 mb-1 text-right">نبذة عني</h2>
            <p className="text-xs text-gray-400 mb-4 text-right">ماذا تريد العملاء أن يعرفوه؟</p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="تكلم عن خبراتك، التزامك بالمواعيد، أو جودة المواد التي تستخدمها..."
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED] resize-none transition-all text-right"
            />
          </div>

          {/* المهارات */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={addSkill}
                className="flex items-center gap-1.5 text-xs font-bold text-[#1093ED] border border-[#1093ED] rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>إضافة مهارة</span>
              </button>
              <h2 className="text-base font-extrabold text-gray-800">المهارات</h2>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 justify-end">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 bg-blue-50 text-[#1093ED] text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                  <span>{skill}</span>
                </span>
              ))}
            </div>

            <div className="flex gap-2 flex-row-reverse">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="أضف مهارة جديدة..."
                className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 text-sm text-right outline-none focus:border-[#1093ED] focus:ring-1 focus:ring-[#1093ED] transition-all"
              />
              <button
                onClick={addSkill}
                className="bg-[#1093ED] text-white px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-colors shrink-0"
              >
                إضافة
              </button>
            </div>
          </div>

          {/* معرض الأعمال */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-1 gap-3">
              <button
                onClick={() => portfolioInputRef.current.click()}
                className="flex items-center gap-1.5 text-xs font-bold text-[#1093ED] border border-[#1093ED] rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors shrink-0"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                <span>إضافة صورة</span>
              </button>
              <div className="text-right">
                <h2 className="text-base font-extrabold text-gray-800">معرض الأعمال</h2>
                <p className="text-[11px] text-[#1093ED] font-bold">صور ملفك تزيد فرصك في القبول %50</p>
              </div>
            </div>
            <input
              ref={portfolioInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePortfolioAdd}
            />

            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              <button
                onClick={() => portfolioInputRef.current.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-[#1093ED] hover:bg-blue-50 transition-all group"
              >
                <PhotoIcon className="w-6 h-6 text-gray-300 group-hover:text-[#1093ED] transition-colors" />
                <span className="text-[10px] text-gray-300 group-hover:text-[#1093ED] transition-colors">صورة جديدة</span>
              </button>

              {portfolio.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                  <img src={src} alt={`work-${i}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePortfolio(i)}
                    className="absolute top-1.5 left-1.5 bg-black/50 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-4 sm:space-y-5 order-1 lg:order-2">

          {/* صورة الحساب */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center overflow-hidden">
                {profilePhotoPreview ? (
                  <img src={profilePhotoPreview} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1093ED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
              <button
                onClick={() => profileInputRef.current.click()}
                className="absolute bottom-0 left-0 bg-[#1093ED] rounded-full p-1.5 shadow-md hover:bg-blue-600 transition-colors"
              >
                <CameraIcon className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhoto}
            />
            <p className="text-sm font-bold text-gray-700">صورة الحساب</p>
            <p className="text-xs text-gray-400 mt-0.5">ضع صورة واضحة وحيوية</p>
          </div>

          {/* نطاق العمل */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-end gap-2 mb-3">
              <h2 className="text-sm font-extrabold text-gray-800">نطاق العمل</h2>
              <MapPinIcon className="w-4 h-4 text-[#1093ED]" />
            </div>
            <p className="text-xs text-gray-400 text-right mb-3">
              {buildAddressFromRegions() || "مثال: الرياض، حي الأرجس"}
            </p>

            <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 relative">
              <iframe
                title="map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=46.5,24.6,46.8,24.8&layer=mapnik"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-[#1093ED] rounded-full w-4 h-4 shadow-lg ring-4 ring-blue-200" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Save Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          <button
            onClick={handleSave}
            disabled={submitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1093ED] text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-60"
          >
            {submitting ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ArrowRightIcon className="w-4 h-4" />
                <span>حفظ واستمرار</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="text-xs font-extrabold text-gray-700">ملفك جاهز للمراجعة</p>
              <p className="text-[11px] text-gray-400">سيراجعه فريق سيرفيكسا خلال 24 ساعة</p>
            </div>
            <div className="bg-green-100 rounded-full p-1.5 shrink-0">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LastStep;