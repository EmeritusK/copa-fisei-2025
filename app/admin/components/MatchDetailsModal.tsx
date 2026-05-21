import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

type GoalEvent = { playerId: string; playerName: string };
type CardEvent = { playerId: string; playerName: string; type: "yellow" | "red" };

type TeamDetails = {
  goals: GoalEvent[];
  cards: CardEvent[];
};

type MatchDetails = {
  homeTeam: TeamDetails;
  awayTeam: TeamDetails;
};

interface MatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: any;
  onSave: (details: MatchDetails) => void;
}

export default function MatchDetailsModal({
  isOpen,
  onClose,
  match,
  onSave,
}: MatchDetailsModalProps) {
  const [details, setDetails] = useState<MatchDetails>({
    homeTeam: { goals: [], cards: [] },
    awayTeam: { goals: [], cards: [] },
  });
  
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");

  useEffect(() => {
    if (match?.details) {
      setDetails({
        homeTeam: match.details.homeTeam || { goals: [], cards: [] },
        awayTeam: match.details.awayTeam || { goals: [], cards: [] },
      });
    } else {
      setDetails({
        homeTeam: { goals: [], cards: [] },
        awayTeam: { goals: [], cards: [] },
      });
    }
  }, [match]);

  if (!isOpen || !match) return null;

  const activeTeam = activeTab === "home" ? match.homeTeam : match.awayTeam;
  const activeDetails = details[activeTab === "home" ? "homeTeam" : "awayTeam"];
  const players = activeTeam?.players || [];

  const handleAddGoal = () => {
    const updated = { ...details };
    updated[activeTab === "home" ? "homeTeam" : "awayTeam"].goals.push({ playerId: "", playerName: "" });
    setDetails(updated);
  };

  const handleUpdateGoal = (index: number, field: keyof GoalEvent, value: string) => {
    const teamKey = activeTab === "home" ? "homeTeam" : "awayTeam";
    const updated = { ...details };
    
    if (field === "playerId") {
      const player = players.find((p: any) => p.id === value);
      updated[teamKey].goals[index] = { 
        ...updated[teamKey].goals[index], 
        playerId: value,
        playerName: player ? player.name : ""
      };
    } else {
      updated[teamKey].goals[index] = { ...updated[teamKey].goals[index], [field]: value };
    }
    setDetails(updated);
  };

  const handleRemoveGoal = (index: number) => {
    const teamKey = activeTab === "home" ? "homeTeam" : "awayTeam";
    const updated = { ...details };
    updated[teamKey].goals.splice(index, 1);
    setDetails(updated);
  };

  const handleAddCard = () => {
    const teamKey = activeTab === "home" ? "homeTeam" : "awayTeam";
    const updated = { ...details };
    updated[teamKey].cards.push({ playerId: "", playerName: "", type: "yellow" });
    setDetails(updated);
  };

  const handleUpdateCard = (index: number, field: keyof CardEvent, value: string) => {
    const teamKey = activeTab === "home" ? "homeTeam" : "awayTeam";
    const updated = { ...details };

    if (field === "playerId") {
      const player = players.find((p: any) => p.id === value);
      updated[teamKey].cards[index] = { 
        ...updated[teamKey].cards[index], 
        playerId: value,
        playerName: player ? player.name : ""
      };
    } else {
      updated[teamKey].cards[index] = { ...updated[teamKey].cards[index], [field]: value };
    }
    setDetails(updated);
  };

  const handleRemoveCard = (index: number) => {
    const teamKey = activeTab === "home" ? "homeTeam" : "awayTeam";
    const updated = { ...details };
    updated[teamKey].cards.splice(index, 1);
    setDetails(updated);
  };

  const handleSave = () => {
    onSave(details);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] border border-border">
        
        {/* Header */}
        <div className="flex flex-col border-b border-border">
          <div className="flex items-center justify-between p-5 pb-4">
            <h2 className="text-xl font-bold text-foreground">
              Detalles del Partido
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface transition-colors text-muted hover:text-foreground"
            >
              <FiX size={20} />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex px-5 gap-4">
            <button
              onClick={() => setActiveTab("home")}
              className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${
                activeTab === "home" 
                  ? "border-accent text-accent" 
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Local: {match.homeTeam?.name} ({details.homeTeam.goals.length})
            </button>
            <button
              onClick={() => setActiveTab("away")}
              className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${
                activeTab === "away" 
                  ? "border-accent text-accent" 
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Visitante: {match.awayTeam?.name} ({details.awayTeam.goals.length})
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background">
          
          {/* Goals Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Goles</h3>
              <button
                onClick={handleAddGoal}
                className="flex items-center gap-1 text-sm bg-accent/10 text-accent px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors"
              >
                <FiPlus /> Agregar Gol
              </button>
            </div>
            
            {activeDetails.goals.length === 0 ? (
              <p className="text-sm text-muted italic">No hay goles registrados para {activeTeam.name}.</p>
            ) : (
              <div className="space-y-3">
                {activeDetails.goals.map((goal, index) => (
                  <div key={index} className="flex flex-wrap sm:flex-nowrap gap-3 items-center bg-card p-3 rounded-lg border border-border">
                    <select
                      value={goal.playerId}
                      onChange={(e) => handleUpdateGoal(index, "playerId", e.target.value)}
                      className="flex-1 min-w-[200px] bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    >
                      <option value="" disabled>Seleccionar Jugador...</option>
                      {players.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.jersey_number} - {p.name}
                        </option>
                      ))}
                    </select>
                    
                    <button
                      onClick={() => handleRemoveGoal(index)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Cards Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Tarjetas</h3>
              <button
                onClick={handleAddCard}
                className="flex items-center gap-1 text-sm bg-accent/10 text-accent px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors"
              >
                <FiPlus /> Agregar Tarjeta
              </button>
            </div>

            {activeDetails.cards.length === 0 ? (
              <p className="text-sm text-muted italic">No hay tarjetas registradas para {activeTeam.name}.</p>
            ) : (
              <div className="space-y-3">
                {activeDetails.cards.map((card, index) => (
                  <div key={index} className="flex flex-wrap sm:flex-nowrap gap-3 items-center bg-card p-3 rounded-lg border border-border">
                    <select
                      value={card.playerId}
                      onChange={(e) => handleUpdateCard(index, "playerId", e.target.value)}
                      className="flex-1 min-w-[200px] bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    >
                      <option value="" disabled>Seleccionar Jugador...</option>
                      {players.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.jersey_number} - {p.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={card.type}
                      onChange={(e) => handleUpdateCard(index, "type", e.target.value)}
                      className="w-32 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    >
                      <option value="yellow">Amarilla</option>
                      <option value="red">Roja</option>
                    </select>

                    <button
                      onClick={() => handleRemoveCard(index)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border flex justify-end gap-3 bg-surface">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-background border border-border transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-hover transition-colors shadow-md"
          >
            Guardar Detalles
          </button>
        </div>
      </div>
    </div>
  );
}
