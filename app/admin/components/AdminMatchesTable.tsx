"use client";

import React, { useState, useEffect } from "react";
import { FiEdit, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MatchDetailsModal from "./MatchDetailsModal";

export default function AdminMatchesTable() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, [page, searchTerm]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/matches?page=${page}&limit=5&search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (data.data) {
        setMatches(data.data);
        setMeta(data.meta);
      }
    } catch (error) {
      console.error("Failed to fetch matches", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDetails = async (details: any) => {
    if (!selectedMatch) return;
    
    try {
      const res = await fetch("/api/admin/matches", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedMatch.id,
          details,
          status: "Finalizado"
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setMatches(matches.map(m => m.id === selectedMatch.id ? updated.data : m));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to save details", error);
    }
  };

  const openDetailsModal = (match: any) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Administración de Partidos</h1>
            <p className="text-sm text-muted mt-1">Ingresa resultados y detalles de los encuentros.</p>
          </div>
          <input 
            type="text" 
            placeholder="Buscar por equipo..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-background text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium text-right">Local</th>
                <th className="px-6 py-4 font-medium text-center">Goles</th>
                <th className="px-6 py-4 font-medium">Visitante</th>
                <th className="px-6 py-4 font-medium text-center">Estado</th>
                <th className="px-6 py-4 font-medium text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    Cargando partidos...
                  </td>
                </tr>
              ) : matches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No hay partidos registrados.
                  </td>
                </tr>
              ) : (
                matches.map((match) => {
                  return (
                    <tr key={match.id} className="hover:bg-background transition-colors text-foreground">
                      <td className="px-6 py-4">
                        <div className="capitalize">
                          {new Date(match.date).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-muted mt-0.5">{match.time}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {match.homeTeam?.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="w-8 text-center font-bold text-lg bg-background border border-border py-1 rounded">
                            {match.home_team_goals ?? "-"}
                          </span>
                          <span className="text-muted">-</span>
                          <span className="w-8 text-center font-bold text-lg bg-background border border-border py-1 rounded">
                            {match.away_team_goals ?? "-"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {match.awayTeam?.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {match.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openDetailsModal(match)}
                          className="p-2 rounded-lg transition-colors flex items-center justify-center mx-auto text-accent hover:bg-accent/10"
                          title="Editar detalles del partido"
                        >
                          <FiEdit size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border bg-background">
            <span className="text-sm text-muted">
              Página {meta.page} de {meta.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-border text-foreground hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="p-2 rounded-lg border border-border text-foreground hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      <MatchDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        match={selectedMatch}
        onSave={handleSaveDetails}
      />
    </div>
  );
}
