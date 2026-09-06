"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default Leaflet icon paths in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export interface MapIssue {
  id: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  category: string;
  status: "Reported" | "Under Review" | "In Progress" | "Resolved";
  severity: "High" | "Mid" | "Low";
  upvotes: number;
  imageUrl?: string;
}

interface MapContentProps {
  issues: MapIssue[];
  activeIssueId: string | null;
}

// Component to handle flying to an active issue
function MapController({ activeIssueId, issues }: { activeIssueId: string | null, issues: MapIssue[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeIssueId) {
      const issue = issues.find(i => i.id === activeIssueId);
      if (issue) {
        map.flyTo([issue.lat, issue.lng], 15, { animate: true, duration: 1 });
      }
    }
  }, [activeIssueId, issues, map]);
  
  return null;
}

export default function MapContent({ issues, activeIssueId }: MapContentProps) {
  const defaultCenter: [number, number] = [6.5028, 3.3736]; // Lagos / Yaba

  const createCustomIcon = (category: string, severity: string) => {
    // Map severity to colors
    let colorClass = "bg-slate-500";
    if (severity === "High") colorClass = "bg-red-500";
    else if (severity === "Mid") colorClass = "bg-amber-500";
    else if (severity === "Low") colorClass = "bg-emerald-500";

    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div class="w-6 h-6 ${colorClass} rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-transform hover:scale-110">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      style={{ height: "100%", width: "100%", zIndex: 10 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      <MapController activeIssueId={activeIssueId} issues={issues} />

      {issues.map((issue) => (
        <Marker 
          key={issue.id} 
          position={[issue.lat, issue.lng]}
          icon={createCustomIcon(issue.category, issue.severity)}
        >
          <Popup className="custom-popup" closeButton={false}>
            <div className="w-56 p-1">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                  issue.severity === 'High' ? 'text-red-600 bg-red-50' : 
                  issue.severity === 'Mid' ? 'text-amber-600 bg-amber-50' : 
                  'text-emerald-600 bg-emerald-50'
                }`}>
                  {issue.severity} Severity
                </span>
                <span className="text-[10px] font-mono text-slate-500">{issue.id}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 leading-tight mb-2 m-0">{issue.title}</h4>
              <p className="text-xs text-slate-500 mb-3 m-0">{issue.location}</p>
              <div className="flex justify-between items-center text-xs">
                <span className={`font-medium ${
                  issue.status === 'Resolved' ? 'text-emerald-600' :
                  issue.status === 'In Progress' ? 'text-amber-600' :
                  'text-slate-600'
                }`}>{issue.status}</span>
                <button className="text-primary font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
