import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ------------------------------------------------------------------
   CONTENT
   Everything editable lives here. Add a project by appending an object
   to `projects` — the filters, counts and grid all update on their own.
------------------------------------------------------------------- */

const profile = {
  name: "Jenna-Marie Smith",
  title: "3D Groom & Prop Artist",
  tagline:
    "3D Artist specializing in real-time hair grooming, production assets, and engine-ready pipelines.",
  bio: "Specializing in high-fidelity hair grooms (XGen, FiberShop, UE5 strands, and hair cards) and production-ready environment and prop assets across both stylized and realistic art directions. Proven studio experience delivering optimized mobile assets for shipped titles.",
  email: "jennamariesmith0@gmail.com",
  artstation: "https://jenna-marie.artstation.com/",
  linkedin: "https://linkedin.com/in/jenna-marie-smith-15b111303",
  software: [
    "Maya",
    "ZBrush",
    "Unreal Engine 5",
    "Unity",
    "Substance Painter",
    "Marmoset Toolbag",
    "XGen",
    "FiberShop",
    "Gaea",
    "Photoshop",
  ],
  strengths: [
    "Real-time hair grooming — strands & hair cards",
    "Character & prop asset creation",
    "Environment design",
    "PBR texturing",
    "Mobile asset optimization",
    "High-to-low poly workflows",
    "Engine integration (UE5 / Unity)",
  ],
};

const CATEGORIES = [
  { id: "grooms", label: "Grooms" },
  { id: "props", label: "Props & Environment" },
];

const projects = [
  {
    id: "medium-twists",
    category: "grooms",
    title: "Medium Twists",
    description:
      "High-fidelity, real-time groom created in Maya XGen and fully integrated into Unreal Engine 5 and Marmoset Toolbag 5. Works parametrically for seamless fit and dynamic deformation across standard MetaHuman head rigs.",
    tags: ["XGen", "Unreal Engine 5", "Marmoset Toolbag"],
    cover: "media/grooms/medium-twists/strand.png",
    ratio: "3 / 4",
    breakdown: [
      { label: "Video", src: "media/grooms/medium-twists/video.mp4" },
      { label: "Reference", src: "media/grooms/medium-twists/reference.png" },
      { label: "Strands", src: "media/grooms/medium-twists/strand.png" },
      { label: "Cards", src: "media/grooms/medium-twists/cards.png" },
      { label: "Wireframe", src: "media/grooms/medium-twists/wireframe.png" },
    ],
  },
  {
    id: "medium-sponge-twists",
    category: "grooms",
    title: "Medium Sponge Twists",
    description:
      "High-fidelity, real-time strands created in Maya XGen and fully integrated into Unreal Engine 5 and Marmoset Toolbag 5. Works parametrically for seamless fit and dynamic deformation across standard MetaHuman head rigs.",
    tags: ["XGen", "Unreal Engine 5", "Marmoset Toolbag"],
    cover: "media/grooms/medium-sponge-twists/strand.png",
    ratio: "3 / 4",
    breakdown: [
      { label: "Video", src: "media/grooms/medium-sponge-twists/video.mp4" },
      { label: "Strand picture", src: "media/grooms/medium-sponge-twists/strand.png" },
    ],
  },
  {
    id: "fungi-props",
    category: "props",
    title: "Fungi Props",
    description:
      "Painterly, hand-crafted environment props created in Maya and Substance Painter for Unity.",
    tags: ["Maya", "Substance Painter", "Unity"],
    cover: "media/props/fungi/cover.png",
    ratio: "4 / 5",
    breakdown: [
      { label: "Cover", src: "media/props/fungi/cover.png" },
      { label: "Clock", src: "media/props/fungi/clock.png" },
      { label: "House", src: "media/props/fungi/house.png" },
      { label: "Book Case", src: "media/props/fungi/bookcase.png" },
      { label: "Book Case 02", src: "media/props/fungi/bookcase-02.png" },
      { label: "Book Holder", src: "media/props/fungi/bookholder.png" },
      { label: "Centerpiece", src: "media/props/fungi/centerpiece.png" },
      { label: "Plant Stand", src: "media/props/fungi/plantstand.png" },
      { label: "Toy Decor", src: "media/props/fungi/toydecor.png" },
      { label: "Vase", src: "media/props/fungi/vase.png" },
    ],
    gallery: [
      { label: "Cover", src: "media/props/fungi/cover.png" },
      { label: "Clock", src: "media/props/fungi/clock.png" },
      { label: "House", src: "media/props/fungi/house.png" },
      { label: "Book Case", src: "media/props/fungi/bookcase.png" },
      { label: "Book Case 02", src: "media/props/fungi/bookcase-02.png" },
      { label: "Book Holder", src: "media/props/fungi/bookholder.png" },
      { label: "Centerpiece", src: "media/props/fungi/centerpiece.png" },
      { label: "Plant Stand", src: "media/props/fungi/plantstand.png" },
      { label: "Toy Decor", src: "media/props/fungi/toydecor.png" },
      { label: "Vase", src: "media/props/fungi/vase.png" },
    ],
  },
  {
    id: "nba-clash",
    category: "props",
    title: "NBA Clash",
    description:
      "Stylized NBA uniform variants created for real-time character customization.",
    tags: ["Maya", "Substance Painter", "Marmoset Toolbag"],
    cover: "media/props/nba-clash/cover.jpg",
    ratio: "3 / 4",
    breakdown: [
      { label: "Cover", src: "media/props/nba-clash/cover.jpg" },
      { label: "_01", src: "media/props/nba-clash/01.jpg" },
    ],
    gallery: [
      { label: "Cover", src: "media/props/nba-clash/cover.jpg" },
      { label: "_01", src: "media/props/nba-clash/01.jpg" },
      { label: "_02", src: "media/props/nba-clash/02.jpg" },
      { label: "_03", src: "media/props/nba-clash/03.jpg" },
      { label: "_04", src: "media/props/nba-clash/04.jpg" },
      { label: "_05", src: "media/props/nba-clash/05.jpg" },
    ],
  },
  {
    id: "beetle-vehicle",
    category: "props",
    title: "Beetle Vehicle",
    description:
      "Hard-surface vehicle asset optimized for real-time engines.",
    tags: ["Maya", "Substance Painter", "Hard surface"],
    cover: "media/props/beetle/detail.jpg",
    ratio: "16 / 10",
    breakdown: [
      { label: "Video", src: "media/props/beetle/turnaround.mp4" },
      { label: "Beauty", src: "media/props/beetle/beauty.jpg" },
      { label: "Main Cam", src: "media/props/beetle/maincam.jpg" },
      { label: "Detail", src: "media/props/beetle/detail.jpg" },
    ],
  },
  {
    id: "panther-gauntlet",
    category: "props",
    title: "Black Panther Gauntlet",
    description:
      "High-detail cinematic prop featuring complex material channels and PBR texturing.",
    tags: ["ZBrush", "Substance Painter", "Marmoset Toolbag"],
    cover: "media/props/panther-gauntlet/maincam.jpg",
    ratio: "1 / 1",
    breakdown: [
      { label: "Turnaround", src: "media/props/panther-gauntlet/turnaround.mp4" },
      { label: "Ref", src: "media/props/panther-gauntlet/ref.png" },
      { label: "Beauty", src: "media/props/panther-gauntlet/beauty.jpg" },
      { label: "MainCam", src: "media/props/panther-gauntlet/maincam.jpg" },
    ],
  },
  {
    id: "golden-armor",
    category: "props",
    title: "Golden Armor",
    description:
      "High-poly ornate character armor pass sculpted in ZBrush with realistic metal shaders.",
    tags: ["ZBrush", "Marmoset Toolbag", "PBR"],
    cover: "media/props/golden-armor/detail.jpg",
    ratio: "3 / 4",
    breakdown: [
      { label: "Turnaround", src: "media/props/golden-armor/turnaround.mp4" },
      { label: "Ref", src: "media/props/golden-armor/ref.png" },
      { label: "Detail", src: "media/props/golden-armor/detail.jpg" },
      { label: "Beauty01", src: "media/props/golden-armor/beauty01.jpg" },
      { label: "Beauty02", src: "media/props/golden-armor/beauty02.jpg" },
      { label: "Beauty03", src: "media/props/golden-armor/beauty03.jpg" },
    ],
  },
  {
    id: "london-cafe",
    category: "props",
    title: "London Cafe",
    description:
      "Interior environment piece showcasing modular asset kits and atmospheric lighting.",
    tags: ["Maya", "Unreal Engine 5", "Modular kit"],
    cover: "media/environments/cafe/main.jpg",
    ratio: "16 / 10",
    breakdown: [
      { label: "Main", src: "media/environments/cafe/main.jpg" },
      { label: "Reference", src: "media/environments/cafe/reference.png" },
      { label: "Chair", src: "media/environments/cafe/chair.jpg" },
      { label: "Microwave", src: "media/environments/cafe/microwave.jpg" },
    ],
    gallery: [
      { label: "Main", src: "media/environments/cafe/main.jpg" },
      { label: "Reference", src: "media/environments/cafe/reference.png" },
      { label: "Chair", src: "media/environments/cafe/chair.jpg" },
      { label: "Microwave", src: "media/environments/cafe/microwave.jpg" },
      { label: "02", src: "media/environments/cafe/02.jpg" },
      { label: "03", src: "media/environments/cafe/03.jpg" },
      { label: "04", src: "media/environments/cafe/04.jpg" },
      { label: "05", src: "media/environments/cafe/05.jpg" },
      { label: "Panini press", src: "media/environments/cafe/panini-press.jpg" },
      { label: "Video", src: "media/environments/cafe/video.mp4" },
    ],
  },
];

/* ------------------------------------------------------------------
   MEDIA
   Images and video share one component so a missing file degrades to a
   labelled slot instead of a broken-image icon.
------------------------------------------------------------------- */

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

function MediaSlot({ src, ratio, compact = false }) {
  return (
    <div
      style={{ aspectRatio: ratio || "4 / 3" }}
      className="flex w-full flex-col items-center justify-center gap-2 bg-[#141417] px-4 text-center"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 text-white/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M3 5.5h18v13H3z" />
        <path d="M3 15l5-4 4 3 3-2.5 6 4.5" />
        <circle cx="8.5" cy="9" r="1.25" />
      </svg>
      {!compact && (
        <p className="text-[11px] leading-relaxed text-white/35">
          Drop the file at
          <span className="mt-0.5 block break-all text-white/55">{src}</span>
        </p>
      )}
    </div>
  );
}

function Media({ src, alt, ratio, className = "", compact = false, autoPlay = false, fit = "cover" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) return <MediaSlot src={src} ratio={ratio} compact={compact} />;

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  if (isVideo(src)) {
    return (
      <video
        src={src}
        muted
        loop
        playsInline
        autoPlay={autoPlay}
        controls={!autoPlay}
        aria-label={alt}
        onError={() => setFailed(true)}
        style={{ aspectRatio: ratio }}
        className={`w-full ${fitClass} ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={{ aspectRatio: ratio }}
      className={`w-full ${fitClass} ${className}`}
    />
  );
}

/* ------------------------------------------------------------------
   SIDEBAR
------------------------------------------------------------------- */

function Sidebar() {
  return (
    <aside className="border-b border-white/10 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="flex flex-col gap-10 px-6 py-10 sm:px-10 lg:px-10 lg:py-14">
        <header>
          <h1 className="font-display text-[2rem] leading-[1.05] tracking-[-0.03em] text-[#F2F1EE] sm:text-[2.5rem]">
            Jenna-Marie
            <br />
            Smith
          </h1>
          <p className="mt-3 text-sm text-[#C9A227]">{profile.title}</p>
          <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-relaxed text-white/60">
            {profile.tagline}
          </p>
        </header>

        <p className="max-w-[52ch] border-l border-white/10 pl-5 text-sm leading-[1.75] text-white/55">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          <a
            href={profile.artstation}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#F2F1EE] px-5 py-2.5 text-sm font-medium text-[#111113] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
          >
            ArtStation
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
          >
            Email
          </a>
        </div>

        <section>
          <h2 className="text-xs font-medium tracking-wide text-white/40">Software</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {profile.software.map((tool) => (
              <li
                key={tool}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.8rem] text-white/70"
              >
                {tool}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-wide text-white/40">What I do</h2>
          <ul className="mt-4 space-y-2.5">
            {profile.strengths.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-snug text-white/65"
              >
                <span aria-hidden="true" className="mt-[0.5em] h-px w-3 shrink-0 bg-[#C9A227]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-auto pt-2 text-xs text-white/30">
          <a
            href={`mailto:${profile.email}`}
            className="break-all text-white/45 underline-offset-4 transition-colors hover:text-white/75 hover:underline"
          >
            {profile.email}
          </a>
          <p className="mt-2">Open to groom and asset work.</p>
        </footer>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------
   PROJECT CARD
------------------------------------------------------------------- */

function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-[#161618] text-left transition-colors duration-300 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
    >
      <span className="relative flex items-center justify-center overflow-hidden bg-[#141417] p-2.5">
        <Media
          src={project.cover}
          alt={project.title}
          ratio={project.ratio}
          autoPlay
          fit="contain"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none">
          <span className="block font-display text-base tracking-[-0.01em] text-white">
            {project.title}
          </span>
          <span className="mt-1 block text-xs text-white/60">
            {project.breakdown.length
              ? `${project.breakdown.length} breakdown passes`
              : "View project"}
          </span>
        </span>
      </span>

      <span className="flex items-baseline justify-between gap-3 px-4 py-3.5">
        <span className="font-display text-[0.95rem] tracking-[-0.01em] text-white/90">
          {project.title}
        </span>
        <span className="shrink-0 text-[0.7rem] text-white/35">
          {project.tags[0]}
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------
   LIGHTBOX
------------------------------------------------------------------- */

function Lightbox({ project, onClose, onPrev, onNext }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const gallery = project.gallery && project.gallery.length ? project.gallery : null;
  const hero = gallery ? gallery[heroIndex] : null;

  const stepHero = useCallback(
    (dir) => {
      if (!gallery) return;
      setHeroIndex((i) => (i + dir + gallery.length) % gallery.length);
    },
    [gallery]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
    setHeroIndex(0);
  }, [project.id]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex justify-center bg-black/85 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative m-0 h-full w-full overflow-y-auto bg-[#111113] sm:m-6 sm:h-auto sm:max-h-[calc(100vh-3rem)] sm:max-w-5xl sm:rounded-xl sm:border sm:border-white/10"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#111113]/90 px-5 py-3.5 backdrop-blur sm:px-8">
          <p className="truncate text-sm text-white/45">
            {project.category === "grooms" ? "Grooms" : "Props & Environment"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="rounded-md border border-white/10 px-2.5 py-1.5 text-sm text-white/60 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="rounded-md border border-white/10 px-2.5 py-1.5 text-sm text-white/60 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              →
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              Close
            </button>
          </div>
        </div>

        <div className="px-5 py-7 sm:px-8 sm:py-10">
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#141417] p-3 sm:p-5">
            <Media
              src={hero ? hero.src : project.cover}
              alt={hero ? `${project.title} — ${hero.label}` : project.title}
              ratio={project.ratio}
              fit="contain"
              className="max-h-[62vh]"
            />
            {gallery && (
              <>
                <button
                  type="button"
                  onClick={() => stepHero(-1)}
                  aria-label="Previous render"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border border-white/15 bg-black/50 px-2.5 py-1.5 text-sm text-white/80 backdrop-blur transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => stepHero(1)}
                  aria-label="Next render"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/15 bg-black/50 px-2.5 py-1.5 text-sm text-white/80 backdrop-blur transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                >
                  →
                </button>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-[0.7rem] text-white/70 backdrop-blur">
                  {hero.label} · {heroIndex + 1}/{gallery.length}
                </span>
              </>
            )}
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.6fr_1fr]">
            <div>
              <h2
                id="lightbox-title"
                className="font-display text-2xl tracking-[-0.02em] text-[#F2F1EE] sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-[1.8] text-white/60">
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium tracking-wide text-white/40">
                Made with
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.8rem] text-white/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.breakdown.length > 0 && (
            <section className="mt-10 border-t border-white/10 pt-8">
              <h3 className="font-display text-lg tracking-[-0.01em] text-white/90">
                Breakdown passes
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {project.breakdown.map((pass) => (
                  <figure
                    key={pass.src}
                    className="overflow-hidden rounded-lg border border-white/10 bg-[#141417]"
                  >
                    <Media src={pass.src} alt={pass.label} ratio="4 / 3" compact />
                    <figcaption className="px-3.5 py-2.5 text-[0.8rem] text-white/55">
                      {pass.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   GALLERY + PAGE
------------------------------------------------------------------- */

export default function App() {
  const [filter, setFilter] = useState("grooms");
  const [activeId, setActiveId] = useState(null);
  const gridRef = useRef(null);

  const visible = useMemo(
    () => projects.filter((p) => p.category === filter),
    [filter]
  );

  const counts = useMemo(
    () => ({
      grooms: projects.filter((p) => p.category === "grooms").length,
      props: projects.filter((p) => p.category === "props").length,
    }),
    []
  );

  const activeProject = visible.find((p) => p.id === activeId) || null;

  const step = useCallback(
    (dir) => {
      if (!visible.length) return;
      const i = visible.findIndex((p) => p.id === activeId);
      const next = (i + dir + visible.length) % visible.length;
      setActiveId(visible[next].id);
    },
    [visible, activeId]
  );

  const changeFilter = (id) => {
    setFilter(id);
    gridRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#111113] font-body text-[#F2F1EE] antialiased selection:bg-[#C9A227] selection:text-[#111113]">
      <div className="lg:grid lg:h-screen lg:grid-cols-[minmax(340px,30rem)_1fr] lg:overflow-hidden">
        <Sidebar />

        <main ref={gridRef} className="lg:h-screen lg:overflow-y-auto">
          <div className="sticky top-0 z-20 border-b border-white/10 bg-[#111113]/85 backdrop-blur">
            <div className="flex flex-wrap items-center gap-1.5 px-6 py-4 sm:px-10">
              {CATEGORIES.map((cat) => {
                const active = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => changeFilter(cat.id)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] ${
                      active
                        ? "bg-[#F2F1EE] text-[#111113]"
                        : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {cat.label}
                    <span className={active ? "ml-2 text-[#111113]/50" : "ml-2 text-white/30"}>
                      {counts[cat.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-7 sm:px-10 sm:py-10">
            {visible.length === 0 ? (
              <p className="py-24 text-center text-sm text-white/40">
                Nothing in this category yet. Add a project to the list in App.jsx.
              </p>
            ) : (
              <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
                {visible.map((project) => (
                  <ProjectCard key={project.id} project={project} onOpen={(p) => setActiveId(p.id)} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {activeProject && (
        <Lightbox
          project={activeProject}
          onClose={() => setActiveId(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </div>
  );
}
