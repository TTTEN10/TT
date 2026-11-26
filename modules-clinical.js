/* ============================================================
   Modules: Psychotherapy + Coaching (licensed clinician)
   ============================================================ */

function LicenseBadge({ accent }) {
  const { profile } = window.JP;
  const lic = (profile.clinical && profile.clinical.license) || null;
  if (!lic) return null;
  return (
    <div className="jb-license" style={{ "--lic-ac": accent || "var(--ok)" }}>
      <span className="jb-license-ico"><Icon name="shield" size={17} /></span>
      <div className="jb-license-body">
        <div className="jb-license-status">{lic.status}</div>
        <div className="jb-license-row">
          <span className="jb-license-reg">{lic.registry}</span>
          <span className="jb-license-num mono">{lic.label} {lic.number}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PSYCHOTHERAPY ---------------- */
function PsychotherapyModule({ openModule }) {
  const { profile } = window.JP;
  const t = window.JP_I18N ? window.JP_I18N.t : (key, fallback) => fallback || key;
  const psy = profile.clinical.psychotherapy;
  return (
    <div className="jp-mod psy">
      <div className="psy-head">
        <div className="jp-eyebrow"><Icon name="psy" size={13} /> {t("psy.eyebrow", "PSYCHOTHERAPY.APP")}</div>
        <h1 className="jp-h1">{t("psy.title", psy.title)}</h1>
        <p className="jp-sub">{t("psy.subtitle", psy.short)}</p>
        <LicenseBadge />
      </div>
      <div className="psy-body">
        <p className="psy-intro">{t("psy.intro", psy.intro)}</p>
        <div className="psy-grid">
          {psy.areas.map((a) => (
            <div key={a.t} className="jp-card psy-card">
              <div className="psy-card-t">{t("psy.area." + a.t, a.t)}</div>
              <p className="psy-card-d">{t("psy.areaDesc." + a.t, a.d)}</p>
            </div>
          ))}
        </div>
        <div className="psy-methods">
          {psy.methods.map((m) => <span key={m} className="jp-chip">{t("psy.method." + m, m)}</span>)}
        </div>
        <button className="jp-card psy-cta" onClick={() => openModule("contact")}>
          <span className="psy-cta-ico"><Icon name="mail" size={16} /></span>
          <span>{t("psy.cta", "Contact to discuss availability and session format.")}</span>
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- COACHING ---------------- */
function CoachingModule({ openModule }) {
  const { profile } = window.JP;
  const t = window.JP_I18N ? window.JP_I18N.t : (key, fallback) => fallback || key;
  const co = profile.clinical.coaching;
  return (
    <div className="jp-mod co">
      <div className="co-head">
        <div className="jp-eyebrow"><Icon name="coach" size={13} /> {t("co.eyebrow", "COACHING.APP")}</div>
        <h1 className="jp-h1">{t("co.title", co.title)}</h1>
        <p className="jp-sub">{t("co.subtitle", co.short)}</p>
        <LicenseBadge accent="var(--warn)" />
      </div>
      <div className="co-body">
        <p className="co-intro">{t("co.intro", co.intro)}</p>
        <div className="co-grid">
          {co.pillars.map((pl) => (
            <div key={pl.t} className="jp-card co-card">
              <div className="co-card-t">{t("co.pillar." + pl.t, pl.t)}</div>
              <p className="co-card-d">{t("co.pillarDesc." + pl.t, pl.d)}</p>
            </div>
          ))}
        </div>
        <div className="co-outcomes">
          {co.outcomes.map((o) => <span key={o} className="jp-chip">{t("co.outcome." + o, o)}</span>)}
        </div>
        <button className="jp-card co-cta" onClick={() => openModule("contact")}>
          <span className="co-cta-ico"><Icon name="mail" size={16} /></span>
          <span>{t("co.cta", "Contact to explore coaching for you or your team.")}</span>
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}

window.JP_MODULES = window.JP_MODULES || {};
window.JP_MODULES.psychotherapy = PsychotherapyModule;
window.JP_MODULES.coaching = CoachingModule;
