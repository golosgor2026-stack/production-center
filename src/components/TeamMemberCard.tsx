import { Mail, Phone, Linkedin } from "lucide-react";
import Image from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  photo,
  email,
  phone,
  linkedin,
}: TeamMemberCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-2">
      {/* Фото */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
            <span className="text-6xl md:text-7xl font-bold text-[#1E40AF]/20">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Контент */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
          {name}
        </h3>
        <p className="text-[#1E40AF] font-medium text-sm mb-3">{role}</p>
        {bio && (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
            {bio}
          </p>
        )}

        {/* Контакты */}
        <div className="flex items-center space-x-2 pt-2">
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-9 h-9 bg-slate-100 hover:bg-[#1E40AF] rounded-xl flex items-center justify-center transition-all duration-300 group/icon"
            >
              <Mail className="w-4 h-4 text-slate-400 group-hover/icon:text-white transition-colors" />
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="w-9 h-9 bg-slate-100 hover:bg-[#1E40AF] rounded-xl flex items-center justify-center transition-all duration-300 group/icon"
            >
              <Phone className="w-4 h-4 text-slate-400 group-hover/icon:text-white transition-colors" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-slate-100 hover:bg-[#1E40AF] rounded-xl flex items-center justify-center transition-all duration-300 group/icon"
            >
              <Linkedin className="w-4 h-4 text-slate-400 group-hover/icon:text-white transition-colors" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
