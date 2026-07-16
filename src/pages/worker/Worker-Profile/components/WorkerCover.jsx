import React, { useEffect, useState } from 'react';
import { HiBriefcase, HiCheckBadge, HiMapPin } from 'react-icons/hi2';
import { NavLink, Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../../../context/Context';
import { getWorkerProfileById } from '../../../../api/workerService';

const WorkerCover = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const workerId = user?.nameid ?? user?.sub ?? user?.id;
    if (!workerId) return;
    getWorkerProfileById(workerId)
      .then((res) => setProfile(res.data?.data ?? res.data))
      .catch(() => {});
  }, [user]);

  const name = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() || profile.fullName || 'فني'
    : (user ? `${user.given_name ?? ''} ${user.family_name ?? ''}`.trim() || user.name || 'فني' : 'فني');

  return (
    <div className="pt-8 px-2 md:px-5">
      <div className="bg-secondary flex flex-col border border-border-color rounded-xl">
        <div className="text-end pt-3 pl-3">
          <Link to="/worker-profile/edit-profile">
            <button className="btn-primary">تعديل الحساب</button>
          </Link>
        </div>
        <div className="self-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-lg bg-slate-200 flex items-center justify-center">
                {profile?.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ) : (
                  <FiUser className="w-12 h-12 text-slate-400" />
                )}
              </div>
              {profile?.isApproved && (
                <div className="absolute bottom-1 right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                  <HiCheckBadge className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
            </div>
            <h1 className="text-lg font-bold text-foreground mt-3">{name}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <HiBriefcase className="w-4 h-4" />
                {profile?.specialty ?? profile?.specialtyName ?? '—'}
              </span>
              {profile?.city && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <HiMapPin className="w-4 h-4" />
                    {profile.city}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="grid-cols-2 sm:grid-cols-3 grid w-full sm:w-fit gap-2 bg-[#E7EBEE] p-1 rounded-xl mt-12">
          <NavLink
            to="/worker-profile"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg duration-150 text-md font-normal ${isActive ? 'bg-white text-primary text-lg' : 'text-gray-800 hover:bg-white hover:text-primary'}`
            }
          >
            الملف الشخصي
          </NavLink>
          <NavLink
            to="/worker-profile/reviews"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg duration-150 text-md font-normal ${isActive ? 'bg-white text-primary text-lg' : 'text-gray-800 hover:bg-white hover:text-primary'}`
            }
          >
            التقييمات
          </NavLink>
          <NavLink
            to="/worker-profile/portfolio"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg duration-150 text-md font-normal col-span-2 text-center sm:col-span-1 ${isActive ? 'bg-white text-primary text-lg' : 'text-gray-800 hover:bg-white hover:text-primary'}`
            }
          >
            معرض الاعمال
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WorkerCover;
