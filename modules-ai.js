/* ============================================================
   Modules: Recruiter AI Assistant + Developer Console
   ============================================================ */
const { useState: uSA, useEffect: uEA, useRef: uRA } = React;

/* ---- Build grounded context from profile data ---- */
function buildContext() {
  const { profile, experience, projects, skills } = window.JP;
  const exp = experience.map((e) => `- ${e.company} - ${e.title} (${e.period}, ${e.location}; ${e.kind}). ${e.summary} Stack: ${e.stack.join(", ")}.`).join("\n");
  const prj = projects.map((p) => `- ${p.name} (${p.kind}, ${p.year}): ${p.oneliner} Tech: ${p.tags.join(", ")}. Problem: ${p.problem} Solution: ${p.solution}`).join("\n");
  const sk = skills.map((s) => s.name).join(", ");
  return `You are the Recruiter Assistant inside "Portfolio OS", the interactive portfolio of ${profile.name}.
Answer questions from recruiters, hiring managers and founders about ${profile.name}. Be warm, concise, confident and specific. Use 2-4 short sentences or tight bullet points. Never invent facts beyond what's given; if unknown, say so and point to contacting them. Speak about ${profile.name} in third person.

PROFILE
Name: ${profile.name}
Role focus: ${profile.role}
Tagline: ${profile.tagline}
Core identity: ${profile.identity}
Status: ${profile.status.state}, available from ${profile.status.availableFrom}. Seeking ${profile.status.seeking}. Based in ${profile.status.location}. ${profile.status.relocation}.
Education: ${profile.education.map((e) => e.degree + " (" + e.school + ")").join("; ")}.
Languages: ${profile.languages.map((l) => `${l.name} / ${l.nativeName} (${l.level})`).join("; ")}.
Contact: ${profile.contact.email}, ${profile.contact.phone}, GitHub ${profile.contact.github}, LinkedIn ${profile.contact.linkedin}.
Track records: ${(profile.trackRecords || []).join("; ")}.
Certifications: ${(profile.certifications || []).join("; ")}.
Licensing & clinical practice: ${(profile.clinical && profile.clinical.license) ? `${profile.clinical.license.status}, registered in ${profile.clinical.license.registry} (${profile.clinical.license.label} ${profile.clinical.license.number}). Psychotherapy: ${profile.clinical.psychotherapy.short}. Coaching: ${profile.clinical.coaching.short}.` : "not provided"}.

EXPERIENCE
${exp}

PROJECTS
${prj}

SKILLS: ${sk}`;
}

/* ---- Rule-based answers (local fallback) ---- */
function matchLocalRule(question) {
  const { profile, experience, projects, skills } = window.JP;
  const q = question.toLowerCase();
  const has = (...words) => words.some((w) => q.includes(w));
  const topProjects = projects.slice(0, 4).map((p) => p.name).join(", ");
  const mgmtSkills = skills.filter((s) => s.cat === "management").slice(0, 6).map((s) => s.name).join(", ");
  const opsSkills = skills.filter((s) => s.cat === "operations" || s.cat === "psychology").slice(0, 6).map((s) => s.name).join(", ");
  const latestExp = experience[0];
  const sampleProjects = projects.slice(0, 3).map((p) => p.name).join(", ");
  const otherExp = experience.slice(1, 3).map((e) => e.company).join(", ");

  if (has("available", "availability", "when", "date", "start")) {
    return { rule: "availability", text: `${profile.name} is ${profile.status.state} and available from ${profile.status.availableFrom}. Based in ${profile.status.location}, ${profile.status.relocation.toLowerCase()}, seeking ${profile.status.seeking}.` };
  }
  if (has("contact", "email", "linkedin", "github", "phone")) {
    return { rule: "contact", text: `Best contact: LinkedIn ${profile.contact.linkedin}. GitHub: ${profile.contact.github}.` };
  }
  if (has("license", "licensed", "rpps", "registration", "registered", "credential") && profile.clinical && profile.clinical.license) {
    const lic = profile.clinical.license;
    return { rule: "license", text: `${lic.status}, registered in ${lic.registry.toLowerCase()} (${lic.label} ${lic.number}). Open the Psychotherapy or Coaching module for details.` };
  }
  if (has("therapy", "therapist", "psychotherap", "sessions", "burnout", "burn-out", "mental", "anxiety") && profile.clinical) {
    const psy = profile.clinical.psychotherapy;
    return { rule: "therapy", text: `Yes - ${profile.name} is a licensed psychologist and ergonomist (RPPS ${profile.clinical.license.number}) and offers online psychotherapy focused on ${psy.areas.map((a) => a.t.toLowerCase()).slice(0, 3).join(", ")}. Open the Psychotherapy module for details.` };
  }
  if (has("coach", "coaching", "telecoach") && profile.clinical) {
    return { rule: "coaching", text: `${profile.name} offers professional coaching for individuals and teams, pairing operational leadership experience with certified work psychology and ergonomics. Open the Coaching module for details.` };
  }
  if (has("fit", "people", "hr", "workplace", "qvct", "ergonom", "psycholog", "operations", "data center", "scaleway")) {
    return { rule: "fit", text: `Yes. ${profile.name}'s core focus is ${profile.role}, with strengths in ${mgmtSkills} and ${opsSkills}. Representative projects include ${sampleProjects}.` };
  }
  if (has("track record", "achievement", "ttm", "migration", "30%")) {
    return { rule: "track", text: (profile.trackRecords || []).join(" ") || `Latest experience is ${latestExp.title} at ${latestExp.company}.` };
  }
  if (has("certification", "certified", "defi", "scaleway ecosystem")) {
    return { rule: "certifications", text: (profile.certifications || []).join("; ") + "." };
  }
  if (has("project management", "pm", "agile", "delivery")) {
    return { rule: "pm", text: `Project management skills include ${mgmtSkills}.${otherExp ? ` Experience spans ${otherExp} and Scaleway.` : ""}` };
  }
  if (has("product", "oriented", "why", "transformation", "change")) {
    return { rule: "product", text: `People-centric orientation shows in combining delivery with workplace science. Projects like ${sampleProjects} illustrate that approach.` };
  }
  if (has("ux", "ergonom", "workplace", "design", "user")) {
    return { rule: "ux", text: `Ergonomics and work-psychology background helps assess real activity before recommending changes. Projects such as ${projects[1]?.name || "the case studies"} reflect that method.` };
  }
  if (has("project", "work", "case", "portfolio")) {
    return { rule: "projects", text: `Representative projects include ${topProjects}. Open any case in the Project Laboratory for full details.` };
  }
  if (has("experience", "intern", "role", "work")) {
    return { rule: "experience", text: `Latest experience is ${latestExp.title} at ${latestExp.company}.${otherExp ? ` Other roles include ${otherExp}.` : ""}` };
  }
  if (has("language", "english", "french", "hebrew")) {
    return { rule: "languages", text: profile.languages.map((l) => `${l.name} (${l.level})`).join(", ") + "." };
  }
  if (has("education", "school", "degree", "master", "bachelor")) {
    return { rule: "education", text: profile.education.map((e) => `${e.degree} at ${e.school}`).join("; ") + "." };
  }
  return null;
}

function defaultAssistantAnswer() {
  const { profile } = window.JP;
  return `${profile.name} is a ${profile.role}. ${profile.tagline} Ask about projects, stack, availability, or contact details.`;
}

function localAssistantAnswer(question) {
  const r = matchLocalRule(question);
  return r ? r.text : defaultAssistantAnswer();
}

/* ---- Feedback log (localStorage, privacy-friendly) ---- */
const ASSISTANT_LOG_KEY = "jp-assistant-feedback";
const ASSISTANT_LOG_MAX = 200;
const assistantStore = {
  read() {
    try { return JSON.parse(window.localStorage.getItem(ASSISTANT_LOG_KEY)) || []; }
    catch (e) { return []; }
  },
  write(list) {
    try { window.localStorage.setItem(ASSISTANT_LOG_KEY, JSON.stringify(list)); }
    catch (e) { /* storage full or blocked — ignore */ }
  },
  logAsk(entry) {
    const list = this.read();
    list.push({ id: "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), ts: Date.now(), ...entry });
    if (list.length > ASSISTANT_LOG_MAX) list.splice(0, list.length - ASSISTANT_LOG_MAX);
    this.write(list);
  },
  rate(id, rating, comment) {
    const list = this.read();
    const rec = list.find((r) => r.id === id);
    if (rec) {
      rec.rating = rating;
      if (comment !== undefined) rec.comment = comment || "";
      this.write(list);
    }
  },
  getLog() { return this.read(); },
  clear() { this.write([]); },
  export() {
    const data = JSON.stringify({ exportedAt: new Date().toISOString(), entries: this.getLog() }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assistant-feedback.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
};

function AssistantModule() {
  const t = window.JP_I18N ? window.JP_I18N.t : (key, fallback) => fallback || key;
  const hasLiveModel = !!(window.claude && window.claude.complete);
  const suggested = [
    t("assistant.suggest.0", "Is Thibaut a good fit for a lead PM or operations role?"),
    t("assistant.suggest.1", "What is his Scaleway track record?"),
    t("assistant.suggest.2", "How does his psychology background complement his ops experience?"),
    t("assistant.suggest.3", "What languages does he speak and at what level?"),
    t("assistant.suggest.4", "Tell me about his data center migration experience."),
  ];
  const [msgs, setMsgs] = uSA(() => [
    { role: "assistant", text: t("assistant.hello", "Hi - I'm the Recruiter Assistant. Ask me anything about experience, projects, stack, or availability.") },
  ]);
  const [input, setInput] = uSA("");
  const [busy, setBusy] = uSA(false);
  const [ratings, setRatings] = uSA({});
  const scrollRef = uRA(null);
  const ctx = uRA(buildContext());

  uEA(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, busy]);

  function commitRating(id, rating, comment) {
    setRatings((r) => ({ ...r, [id]: { rating, comment: comment || (r[id] || {}).comment || "" } }));
    assistantStore.rate(id, rating, comment);
  }

  async function ask(q) {
    const question = (q ?? input).trim();
    if (!question || busy) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setBusy(true);
    const startedAt = Date.now();
    const minimumThink = new Promise((resolve) => window.setTimeout(resolve, 650));
    try {
      const prompt = `${ctx.current}\n\nRecruiter question: ${question}\n\nAnswer:`;
      let text = "";
      let meta = { mode: "local", rule: "fallback", matched: false };
      if (window.claude && window.claude.complete) {
        text = ((await window.claude.complete(prompt)) || "").trim();
        meta = { mode: "live", rule: "live", matched: true };
      } else {
        const r = matchLocalRule(question);
        text = r ? r.text : localAssistantAnswer(question);
        meta = { mode: "local", rule: r ? r.rule : "fallback", matched: !!r };
      }
      if (!text) {
        text = localAssistantAnswer(question);
        meta = { mode: "local", rule: "fallback", matched: false };
      }
      if (Date.now() - startedAt < 650) await minimumThink;
      const msgId = "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      assistantStore.logAsk({ question, answer: text, mode: meta.mode, rule: meta.rule, matched: meta.matched });
      setMsgs((m) => [...m, { role: "assistant", text, id: msgId }]);
    } catch (e) {
      if (Date.now() - startedAt < 650) await minimumThink;
      const answer = localAssistantAnswer(question);
      assistantStore.logAsk({ question, answer, mode: "local", rule: "fallback", matched: false });
      setMsgs((m) => [...m, { role: "assistant", text: answer, id: "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="jp-mod ai">
      <div className="ai-head">
        <div className="ai-head-id">
          <div className="ai-orb"><Icon name="ai" size={18} /></div>
          <div>
            <div className="ai-title disp">{t("assistant.title", "Recruiter Assistant")}</div>
            <div className="ai-status"><span className="jp-mb-live" /> {hasLiveModel ? t("assistant.status.live", "Live AI") : t("assistant.status.local", "Portfolio knowledge base")}</div>
          </div>
        </div>
      </div>

      <div className="ai-scroll" ref={scrollRef}>
        {msgs.map((m, i) => (
          <div key={i} className={"ai-msg " + m.role}>
            {m.role === "assistant" && <div className="ai-msg-av"><Icon name="ai" size={14} /></div>}
            <div className="ai-msg-body">
              <div className="ai-bubble">{m.text}</div>
              {m.role === "assistant" && m.id && (
                <AssistantFeedback id={m.id} value={ratings[m.id]} onRate={commitRating} onComment={(id, c) => setRatings((r) => ({ ...r, [id]: { rating: (r[id] || {}).rating, comment: c } }))} t={t} />
              )}
            </div>
          </div>
        ))}
        {busy && (
          <div className="ai-msg assistant">
            <div className="ai-msg-av"><Icon name="ai" size={14} /></div>
            <div className="ai-bubble ai-think"><span /><span /><span /></div>
          </div>
        )}
        {msgs.length <= 1 && !busy && (
          <div className="ai-suggest">
            {suggested.map((s) => (
              <button key={s} className="ai-sug" onClick={() => ask(s)}>{s}</button>
            ))}
          </div>
        )}
      </div>

      <div className="ai-input">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={t("assistant.placeholder", "Ask a question...")} disabled={busy} />
        <button className="ai-send" onClick={() => ask()} disabled={busy || !input.trim()}>
          <Icon name="send" size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- ASSISTANT FEEDBACK ---------------- */
function AssistantFeedback({ id, value, onRate, onComment, t }) {
  const v = value || {};
  const chosen = v.rating;
  return (
    <div className="ai-feedback">
      {chosen ? (
        <span className="ai-feedback-done">
          <Icon name={chosen === "up" ? "up" : "down"} size={12} />
          {chosen === "up" ? t("assistant.fb.helpful", "Helpful") : t("assistant.fb.notHelpful", "Not helpful")}
        </span>
      ) : (
        <>
          <button className="ai-fb" onClick={() => onRate(id, "up")} aria-label={t("assistant.fb.up", "Helpful answer")} title={t("assistant.fb.up", "Helpful answer")}><Icon name="up" size={13} /></button>
          <button className="ai-fb" onClick={() => onRate(id, "down")} aria-label={t("assistant.fb.down", "Not helpful")} title={t("assistant.fb.down", "Not helpful")}><Icon name="down" size={13} /></button>
        </>
      )}
      {chosen === "down" && (
        <input className="ai-fb-comment" value={v.comment || ""} placeholder={t("assistant.fb.comment", "What was missing? (optional)")}
          onChange={(e) => onComment(id, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onRate(id, chosen, e.target.value); e.currentTarget.blur(); } }}
          onBlur={(e) => onRate(id, chosen, e.target.value)} />
      )}
    </div>
  );
}

/* ---------------- ASSISTANT FEEDBACK SUMMARY ---------------- */
function feedbackSummary() {
  const log = assistantStore.getLog();
  const tt = window.JP_I18N ? window.JP_I18N.t : (key, fallback) => fallback || key;
  const total = log.length;
  const up = log.filter((l) => l.rating === "up").length;
  const down = log.filter((l) => l.rating === "down").length;
  const live = log.filter((l) => l.mode === "live").length;
  const local = total - live;
  const fallback = log.filter((l) => l.rule === "fallback").length;
  const counts = {};
  for (const l of log) if (l.rule === "fallback") counts[l.question] = (counts[l.question] || 0) + 1;
  const top = Object.entries(counts).sort((x, y) => y[1] - x[1]).slice(0, 5);
  const lines = [
    { t: "kv", k: tt("terminal.feedback.total", "total"), v: String(total) },
    { t: "kv", k: tt("terminal.feedback.helpful", "helpful"), v: String(up) },
    { t: "kv", k: tt("terminal.feedback.notHelpful", "not helpful"), v: String(down) },
    { t: "kv", k: tt("terminal.feedback.mode", "live / local"), v: `${live} / ${local}` },
    { t: "kv", k: tt("terminal.feedback.unanswered", "fallback answers"), v: String(fallback) },
  ];
  if (top.length) {
    lines.push({ t: "out", c: tt("terminal.feedback.topUnanswered", "top unanswered questions:") });
    for (const [q, n] of top) lines.push({ t: "out", c: `  ${n}x  ${q}` });
  }
  return { lines };
}

/* ---------------- DEVELOPER CONSOLE ---------------- */
function ConsoleModule({ openModule }) {
  const { profile, experience, projects, skills, modules, terminal } = window.JP;
  const tr = window.JP_I18N ? window.JP_I18N.t : (key, fallback) => fallback || key;
  const moduleAliases = {
    ai: "assistant",
    ask: "assistant",
    assistant: "assistant",
    career: "experience",
    cv: "resume",
    resume: "resume",
    work: "projects",
    project: "projects",
    projects: "projects",
    skill: "skills",
    skills: "skills",
    lang: "languages",
    language: "languages",
    languages: "languages",
    therapy: "psychotherapy",
    psychotherapy: "psychotherapy",
    psycho: "psychotherapy",
    coach: "coaching",
    coaching: "coaching",
    terminal: "console",
    console: "console",
  };
  const [lines, setLines] = uSA(() => [
    { t: "sys", c: tr("terminal.sys", "Portfolio OS - Command Center  v1.0.0") },
    { t: "sys", c: tr("terminal.helpHint", "Type 'help' for a list of commands.") },
  ]);
  const [val, setVal] = uSA("");
  const [hist, setHist] = uSA([]);
  const [hi, setHi] = uSA(-1);
  const endRef = uRA(null);
  const inRef = uRA(null);

  uEA(() => { if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; }, [lines]);

  function findModule(name) {
    const key = name.toLowerCase();
    const alias = moduleAliases[key];
    return modules.find((m) => m.id === key || m.short.toLowerCase() === key || m.name.toLowerCase() === key || m.id === alias);
  }

  function commandResult(c, a) {
    switch (c.toLowerCase()) {
      case "help": return { lines: [{ t: "out", c: tr("terminal.helpTitle", "Available commands:") },
        { t: "kv", k: "whoami", v: tr("terminal.help.whoami", "who is the profile owner") },
        { t: "kv", k: "ls", v: tr("terminal.help.ls", "list modules") },
        { t: "kv", k: "open <module>", v: tr("terminal.help.open", "launch a module, e.g. open projects or open ai") },
        { t: "kv", k: "experience", v: tr("terminal.help.experience", "career history") },
        { t: "kv", k: "projects", v: tr("terminal.help.projects", "product case studies") },
        { t: "kv", k: "skills", v: tr("terminal.help.skills", "technical skills") },
        { t: "kv", k: "cat mission.txt", v: tr("terminal.help.mission", "product mission") },
        { t: "kv", k: "ls strengths/", v: tr("terminal.help.strengths", "core strengths") },
        { t: "kv", k: "open current-focus.md", v: tr("terminal.help.focus", "current focus") },
        { t: "kv", k: "cat why-me.txt", v: tr("terminal.help.why", "why this profile") },
        { t: "kv", k: "contact", v: tr("terminal.help.contact", "how to reach him") },
        { t: "kv", k: "status", v: tr("terminal.help.status", "availability") },
        { t: "kv", k: "assistant logs", v: tr("terminal.help.feedback", "assistant feedback stats + unanswered") },
        { t: "kv", k: "clear", v: tr("terminal.help.clear", "clear the console") }] };
      case "whoami": return { lines: [
        { t: "out", c: `${profile.name} - ${profile.role}` },
        { t: "dim", c: profile.tagline },
        { t: "kv", k: tr("terminal.whoami.identity", "identity"), v: profile.identity },
        { t: "kv", k: tr("terminal.whoami.focus", "focus"), v: profile.resume.focus.slice(0, 3).join(" / ") },
        { t: "kv", k: tr("terminal.whoami.latest", "latest"), v: `${experience[0].title} @ ${experience[0].company}` },
        { t: "kv", k: tr("terminal.whoami.stack", "stack"), v: skills.slice(0, 8).map((s) => s.name).join(" / ") },
        { t: "kv", k: tr("terminal.whoami.available", "available"), v: `${profile.status.availableFrom} · ${profile.status.location}` },
      ] };
      case "experience": case "exp": return { lines: experience.map((e) => ({ t: "kv", k: e.company, v: e.title })) };
      case "projects": case "proj": return { lines: projects.map((p) => ({ t: "kv", k: p.name, v: p.oneliner })) };
      case "therapy": case "psychotherapy": case "psycho": {
        if (!profile.clinical) return { lines: [{ t: "err", c: "clinical data not found" }] };
        return { lines: [
          { t: "out", c: profile.clinical.psychotherapy.title },
          { t: "out", c: profile.clinical.psychotherapy.short },
          { t: "kv", k: profile.clinical.license.label, v: profile.clinical.license.number },
          { t: "kv", k: tr("terminal.therapy.registry", "registry"), v: profile.clinical.license.registry },
        ] };
      }
      case "coaching": case "coach": {
        if (!profile.clinical) return { lines: [{ t: "err", c: "clinical data not found" }] };
        return { lines: [
          { t: "out", c: profile.clinical.coaching.title },
          { t: "out", c: profile.clinical.coaching.short },
        ] };
      }
      case "skills": return { lines: [{ t: "out", c: skills.map((s) => s.name).join("  /  ") }] };
      case "cat": {
        if (a === "mission.txt") return { lines: [{ t: "out", c: terminal.mission }] };
        if (a === "why-me.txt") return { lines: [{ t: "out", c: terminal.why }] };
        return { lines: [{ t: "err", c: tr("terminal.notFound", "file not found:") + ` ${a}` }] };
      }
      case "ls": {
        if (a === "strengths/" || a === "strengths") return { lines: terminal.strengths.map((s) => ({ t: "out", c: s })) };
        return { lines: modules.map((m) => ({ t: "kv", k: m.id, v: m.desc })) };
      }
      case "open": {
        if (a === "current-focus.md") {
          return { lines: [{ t: "out", c: tr("terminal.focusTitle", "Current focus:") }, ...terminal.focus.map((f) => ({ t: "out", c: `* ${f}` }))] };
        }
        const target = findModule(a);
        if (target) return { lines: [{ t: "ok", c: `${tr("terminal.launching", "launching")} ${target.name}...` }], action: () => openModule(target.id) };
        return { lines: [{ t: "err", c: `${tr("terminal.noModule", "no module")} '${a}'. ${tr("terminal.try", "try:")} ${modules.map((m) => m.id).join(", ")}` }] };
      }
      case "contact": return { lines: [{ t: "kv", k: "email", v: profile.contact.email },
        { t: "kv", k: "phone", v: profile.contact.phone },
        { t: "kv", k: "github", v: profile.contact.github },
        { t: "kv", k: "linkedin", v: profile.contact.linkedin }] };
      case "status": return { lines: [{ t: "ok", c: `${profile.status.state} · ${tr("terminal.availableFrom", "available from")} ${profile.status.availableFrom} · ${profile.status.location} · ${profile.status.relocation}` }] };
      case "assistant": case "feedback": {
        const sub = (a || "").trim().toLowerCase();
        if (sub === "logs" || sub === "stats" || sub === "") return feedbackSummary();
        if (sub === "export") return { lines: [{ t: "out", c: tr("terminal.feedback.exporting", "exporting assistant feedback log...") }], action: () => assistantStore.export() };
        if (sub === "reset") {
          assistantStore.clear();
          return { lines: [{ t: "ok", c: tr("terminal.feedback.reset", "feedback log cleared.") }] };
        }
        return { lines: [{ t: "err", c: tr("terminal.feedback.usage", "usage: assistant logs | export | reset") }] };
      }
      case "clear": return { clear: true };
      case "sudo": return { lines: [{ t: "dim", c: tr("terminal.sudo", "Nice try. Root access is reserved; recruiters get read access.") }] };
      case "echo": return { lines: [{ t: "out", c: a }] };
      case "hello": case "hi": return { lines: [{ t: "ok", c: tr("terminal.hello", "Hey there. Type 'whoami', 'open projects', or 'open ai'.") }] };
      default: return { lines: [{ t: "err", c: `${tr("terminal.commandNotFound", "command not found:")} ${c}. ${tr("terminal.typeHelp", "type 'help'.")}` }] };
    }
  }

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return false;
    const [c, ...args] = cmd.split(/\s+/);
    const a = args.join(" ");
    const result = commandResult(c, a);
    setHist((h) => [cmd, ...h]);
    setHi(-1);
    if (result.clear) {
      setLines([]);
    } else {
      setLines((l) => [...l, { t: "in", c: cmd }, ...(result.lines || [])]);
    }
    if (result.action) window.setTimeout(result.action, 0);
    window.setTimeout(() => inRef.current && inRef.current.focus(), 0);
    return true;
  }

  function onKey(e) {
    if (e.key === "Enter") { if (run(val)) setVal(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); if (n >= 0) { setHi(n); setVal(hist[n]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; if (n < 0) { setHi(-1); setVal(""); } else { setHi(n); setVal(hist[n]); } }
  }

  return (
    <div className="jp-mod term" onClick={() => inRef.current && inRef.current.focus()}>
      <div className="term-scroll" ref={endRef}>
        {lines.map((l, i) => {
          if (l.t === "in") return <div key={i} className="term-line"><span className="term-prompt">{profile.handle}@os</span><span className="term-tilde">~</span><span className="term-arrow">❯</span> {l.c}</div>;
          if (l.t === "kv") return <div key={i} className="term-kv"><span className="term-k">{l.k}</span><span className="term-v">{l.v}</span></div>;
          if (l.t === "err") return <div key={i} className="term-out err">{l.c}</div>;
          if (l.t === "ok") return <div key={i} className="term-out ok">{l.c}</div>;
          if (l.t === "dim") return <div key={i} className="term-out dim">{l.c}</div>;
          if (l.t === "sys") return <div key={i} className="term-out sys">{l.c}</div>;
          return <div key={i} className="term-out">{l.c}</div>;
        })}
        <div className="term-line live">
          <span className="term-prompt">{profile.handle}@os</span><span className="term-tilde">~</span><span className="term-arrow">❯</span>
          <input ref={inRef} className="term-input" value={val} autoFocus spellCheck="false"
            onChange={(e) => setVal(e.target.value)} onKeyDown={onKey} />
        </div>
      </div>
    </div>
  );
}

window.JP_MODULES = window.JP_MODULES || {};
window.JP_MODULES.assistant = AssistantModule;
window.JP_MODULES.console = ConsoleModule;
