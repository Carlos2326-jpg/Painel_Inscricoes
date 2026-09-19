import React from 'react';
import '../../_shared/style/components/common/CardsSection.css';

const cardsData = [
    {
        // Coloque o ícone aqui (ex: <FaGraduationCap />) ou um emoji temporário
        icon: '🎓', 
        title: 'Minicursos',
        description: 'Aprenda novas ferramentas inovadoras e desenvolva habilidades para o mercado de trabalho com atividades práticas.'
    },
    {
        icon: '🔗',
        title: 'Networking',
        description: 'Conheça colegas estudantes, profissionais e pessoas que compartilham dos mesmos interesses e visão de futuro que você.'
    },
    {
        icon: '📍',
        title: 'Palestras e conversas',
        description: 'Descubra as perspectivas e conheça experiências de ex-estudantes da FATEC, que hoje em dia estão atuando no mercado.'
    },
    {
        icon: '🏆',
        title: 'Desafio tecnológico',
        description: 'Coloque suas habilidades à prova e concorra a prêmios ao transformar ideias em soluções no campeonato de tecnologia.'
    }
];

export default function CardsSection() {
    return (
        <section className="cards-grid">
            {cardsData.map((card, index) => (
                <div key={index} className="card">
                    <div className="card-header">
                        {/* Renderiza o ícone se ele existir */}
                        {card.icon && <span className="card-icon">{card.icon}</span>}
                        <h3 className="card-title">{card.title}</h3>
                    </div>
                    <p className="card-description">{card.description}</p>
                </div>
            ))}
        </section>
    );
}