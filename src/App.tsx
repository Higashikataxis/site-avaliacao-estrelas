import { useState } from "react";

type Comment = {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
  initials: string;
};

const initialComments: Comment[] = [
  {
    id: 1,
    name: "Lyra de Valedouro",
    text: "Uma experiência digna das melhores canções do reino. A ambientação é sombria na medida certa e cada detalhe parece ter uma história.",
    rating: 5,
    date: "Há 2 dias",
    initials: "LV",
  },
  {
    id: 2,
    name: "Bram, o Errante",
    text: "Cada morte me ensinou um novo caminho pela masmorra. O ciclo é cruel, mas descobrir como avançar torna cada retorno recompensador.",
    rating: 4,
    date: "Há 5 dias",
    initials: "BE",
  },
];

function Star({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`star ${onClick ? "star--interactive" : ""} ${active ? "star--active" : ""}`}
    >
      ★
    </button>
  );
}

function StarRow({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  return (
    <div className={`stars stars--${size}`} aria-label={`${rating} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} active={star <= Math.round(rating)} />
      ))}
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true">
      <path d="M32 3 57 13v20c0 18-10 29-25 36C17 62 7 51 7 33V13L32 3Z" />
      <path d="M32 13v43M17 25h30" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const [commentHoverRating, setCommentHoverRating] = useState(0);

  function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!commentName.trim() || !commentText.trim() || !commentRating) return;

    const initials = commentName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    setComments((current) => [
      {
        id: Date.now(),
        name: commentName.trim(),
        text: commentText.trim(),
        rating: commentRating,
        date: "Agora mesmo",
        initials,
      },
      ...current,
    ]);
    setCommentName("");
    setCommentText("");
    setCommentRating(0);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a href="#" className="brand" aria-label="Condenados a Voltar — início">
          <span className="brand-mark">
            <ShieldIcon />
          </span>
          <span>
            <strong>Condenados</strong>
            <small>a voltar</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Principal">
          <a href="#destaques" onClick={() => setMenuOpen(false)}>
            Destaques
          </a>
          <a href="#comentarios" onClick={() => setMenuOpen(false)}>
            Comentários
          </a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>
            O Jogo
          </a>
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="destaques">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker">
            <span /> Roguelike de fantasia sombria <span />
          </p>
          <h1>
            A morte é apenas
            <em>o começo.</em>
          </h1>
          <p className="hero-copy">
            Quatro condenados. Um amuleto mágico. Uma masmorra que se recusa a
            deixá-los partir. Morra, retorne e tente escapar outra vez.
          </p>
          <div className="hero-actions">
            <a className="button" href="#sobre">
              Conheça a jornada <span>↓</span>
            </a>
            <div className="hero-score">
              <strong>4,8</strong>
              <div>
                <StarRow rating={5} />
                <span>Avaliação dos jogadores</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Role para descobrir</span>
          <i />
        </div>
      </section>

      <section className="comments-section" id="comentarios">
        <div className="comments-heading">
          <div>
            <p className="section-label">Vozes do salão</p>
            <h2>O que dizem os viajantes</h2>
          </div>
          <span>{comments.length} comentários registrados</span>
        </div>

        <div className="comments-layout">
          <form className="comment-form" onSubmit={submitComment}>
            <p className="form-number">I</p>
            <h3>Deixe seu comentário</h3>
            <p>Compartilhe sua experiência com os próximos aventureiros.</p>

            <label htmlFor="comment-name">Seu nome</label>
            <input
              id="comment-name"
              type="text"
              value={commentName}
              onChange={(event) => setCommentName(event.target.value)}
              placeholder="Como devemos chamá-lo?"
              maxLength={40}
            />

            <label>Sua nota</label>
            <div
              className="comment-rating"
              onMouseLeave={() => setCommentHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onMouseEnter={() => setCommentHoverRating(star)}>
                  <Star
                    active={star <= (commentHoverRating || commentRating)}
                    onClick={() => setCommentRating(star)}
                    label={`${star} ${star === 1 ? "estrela" : "estrelas"}`}
                  />
                </span>
              ))}
            </div>

            <label htmlFor="comment-text">Seu relato</label>
            <textarea
              id="comment-text"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Registre aqui suas impressões..."
              maxLength={500}
              rows={5}
            />
            <div className="form-footer">
              <span>{commentText.length}/500</span>
              <button
                className="button"
                type="submit"
                disabled={!commentName.trim() || !commentText.trim() || !commentRating}
              >
                Publicar relato
              </button>
            </div>
          </form>

          <div className="comment-list" aria-live="polite">
            {comments.map((comment) => (
              <article className="comment-card" key={comment.id}>
                <div className="comment-avatar">{comment.initials}</div>
                <div className="comment-body">
                  <div className="comment-author">
                    <div>
                      <h3>{comment.name}</h3>
                      <span>{comment.date}</span>
                    </div>
                    <StarRow rating={comment.rating} />
                  </div>
                  <p>“{comment.text}”</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="council" id="sobre">
        <div>
          <p className="section-label">Presos no tempo</p>
          <h2>Morra. Retorne.<br />Quebre o ciclo.</h2>
        </div>
        <p>
          Explore uma masmorra em constante mudança, enfrente inimigos implacáveis
          e domine quatro protagonistas jogáveis. O amuleto sempre os traz de
          volta — mas somente a vitória poderá libertá-los.
        </p>
        <div className="council-seal">
          <ShieldIcon />
          <span>Retorne<br />outra vez</span>
        </div>
      </section>

      <footer>
        <div className="brand brand--footer">
          <span className="brand-mark"><ShieldIcon /></span>
          <span><strong>Condenados</strong><small>a voltar</small></span>
        </div>
        <p>© 2025 Condenados a Voltar. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
