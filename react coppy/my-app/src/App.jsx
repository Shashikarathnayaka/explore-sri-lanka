/**
 * ============================================================
 *  Explore Sri Lanka — Full React SPA
 *  Convert from: index.html (multi-page HTML/CSS/JS site)
 *  Firebase: REMOVED — state managed with React useState
 *  Comments: localStorage use karala persist karanawa
 * ============================================================
 *
 *  HOW TO USE:
 *  1. npm create vite@latest explore-sl -- --template react
 *  2. cd explore-sl
 *  3. npm install
 *  4. src/App.jsx file eka delete karala meka paste karanna
 *     (file name: App.jsx)
 *  5. npm run dev
 *
 *  Dependencies needed:
 *  npm install @fortawesome/fontawesome-free
 *  index.html eke <head> tag eke meka add karanna:
 *  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
 *  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
 * ============================================================
 */

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  CSS — inline styles (production use walata
//  styles.css file ekak hadanna recommend karala)
// ─────────────────────────────────────────────
const globalCSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold:   #c9a84c;
    --dark:   #1a1a2e;
    --deep:   #0f0f1a;
    --cream:  #f8f4ee;
    --accent: #e8741a;
    --text:   #2d2d2d;
    --white:  #ffffff;
    --shadow: 0 4px 20px rgba(0,0,0,0.10);
  }

  body {
    font-family: 'Lato', sans-serif;
    background: var(--cream);
    color: var(--text);
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }

  /* ── NAVBAR ── */
  .navbar {
    position: sticky; top: 0; z-index: 200;
    background: var(--dark);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 64px;
    box-shadow: 0 2px 24px rgba(0,0,0,0.45);
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-logo-icon { font-size: 26px; }
  .nav-logo h2 { color: var(--gold); font-size: 1.25rem; letter-spacing: 1px; }
  .nav-menu { display: flex; gap: 2px; list-style: none; }
  .nav-menu li a {
    color: #bbb; text-decoration: none; padding: 8px 13px; border-radius: 6px;
    font-size: 0.82rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
    transition: all 0.2s;
  }
  .nav-menu li a:hover,
  .nav-menu li a.active { color: var(--gold); background: rgba(201,168,76,0.12); }
  .nav-auth { display: flex; gap: 8px; }
  .btn-login {
    background: transparent; border: 1.5px solid var(--gold); color: var(--gold);
    padding: 7px 18px; border-radius: 6px; cursor: pointer; font-weight: 700;
    font-size: 0.82rem; transition: all 0.2s;
  }
  .btn-login:hover { background: var(--gold); color: var(--dark); }
  .btn-signup {
    background: var(--gold); border: none; color: var(--dark);
    padding: 7px 18px; border-radius: 6px; cursor: pointer; font-weight: 700;
    font-size: 0.82rem; transition: all 0.2s;
  }
  .btn-signup:hover { background: #e6c060; }

  /* ── HERO ── */
  .hero {
    min-height: 88vh;
    background: linear-gradient(135deg, var(--deep) 0%, #16213e 50%, #0f3460 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 60px 20px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(232,116,26,0.10) 0%, transparent 50%);
    pointer-events: none;
  }
  .hero-sub {
    color: var(--gold); font-size: 0.82rem; letter-spacing: 4px;
    text-transform: uppercase; margin-bottom: 16px; position: relative;
  }
  .hero-title {
    font-size: clamp(2.4rem, 6vw, 5rem); color: #fff;
    line-height: 1.1; position: relative;
  }
  .hero-title .gold { color: var(--gold); }
  .hero-desc {
    color: #bbb; max-width: 560px; margin: 20px auto;
    font-size: 1.05rem; line-height: 1.8; position: relative;
  }
  .hero-btns { display: flex; gap: 14px; margin-top: 32px; position: relative; flex-wrap: wrap; justify-content: center; }
  .hero-btns button {
    padding: 14px 32px; border-radius: 8px; cursor: pointer;
    font-weight: 700; font-size: 0.95rem; border: none; transition: all 0.25s;
  }
  .btn-primary { background: var(--gold); color: var(--dark); }
  .btn-primary:hover { background: #e6c060; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.4); }
  .btn-outline { background: transparent; border: 2px solid #fff !important; color: #fff; }
  .btn-outline:hover { background: #fff; color: var(--dark); transform: translateY(-2px); }

  /* ── SEARCH ── */
  .search-section {
    background: #fff; padding: 32px 20px; text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  .search-wrap {
    display: flex; max-width: 500px; margin: 0 auto;
    border-radius: 8px; overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  }
  .search-wrap input {
    flex: 1; padding: 14px 20px; border: none;
    font-size: 1rem; outline: none; font-family: 'Lato', sans-serif;
  }
  .search-wrap button {
    background: var(--gold); color: var(--dark); border: none;
    padding: 14px 24px; cursor: pointer; font-weight: 700;
    font-size: 0.95rem; transition: background 0.2s;
  }
  .search-wrap button:hover { background: #e6c060; }
  .search-result { margin-top: 12px; color: var(--accent); font-weight: 700; font-size: 0.95rem; }

  /* ── MAP INFO ── */
  .map-info {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 40px; max-width: 1100px;
    margin: 0 auto; padding: 60px 20px; align-items: center;
  }
  @media (max-width: 700px) { .map-info { grid-template-columns: 1fr; } }
  .map-info iframe {
    width: 100%; height: 340px; border-radius: 12px; border: none;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }
  .map-text h2 { font-size: 2rem; color: var(--dark); margin-bottom: 16px; }
  .map-text p { color: #666; line-height: 1.8; font-size: 1rem; }

  /* ── SECTION / GRID HELPERS ── */
  .section { padding: 60px 20px; }
  .section-title { text-align: center; margin-bottom: 40px; }
  .section-title h2 { font-size: 2.2rem; color: var(--dark); }
  .section-title p { color: #888; margin-top: 8px; }
  .section-title .gold { color: var(--gold); }

  /* ── DESTINATION PREVIEW CARDS ── */
  .dest-preview-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px; max-width: 1100px; margin: 0 auto;
  }
  .dest-preview-card {
    background: #fff; border-radius: 14px; overflow: hidden;
    box-shadow: var(--shadow); cursor: pointer; transition: transform 0.25s, box-shadow 0.25s;
  }
  .dest-preview-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.15); }
  .dest-card-thumb {
    height: 180px; display: flex; align-items: center;
    justify-content: center; font-size: 3.5rem;
  }
  .dest-card-body { padding: 18px; }
  .dest-card-body h3 { color: var(--dark); margin-bottom: 6px; }
  .dest-card-body p { color: #888; font-size: 0.9rem; line-height: 1.5; }

  /* ── HOTEL SECTION ── */
  .hotel-filters {
    max-width: 1200px; margin: 0 auto 20px;
    display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  }
  .hotel-search-box {
    display: flex; border: 1.5px solid #ddd; border-radius: 8px;
    overflow: hidden; flex: 1; min-width: 220px;
  }
  .hotel-search-box input {
    flex: 1; padding: 10px 14px; border: none;
    font-size: 0.9rem; outline: none; font-family: 'Lato', sans-serif;
  }
  .hotel-search-box button {
    background: var(--cream); border: none; padding: 10px 14px; cursor: pointer; color: #888;
  }
  .pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    background: #f0f0f0; border: none; padding: 7px 16px; border-radius: 20px;
    cursor: pointer; font-size: 0.82rem; font-weight: 700; transition: all 0.2s;
  }
  .pill:hover { background: #e0e0e0; }
  .pill.active { background: var(--gold); color: var(--dark); }
  .hotel-count { max-width: 1200px; margin: 0 auto 16px; color: #888; font-size: 0.88rem; }
  .hotel-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; max-width: 1200px; margin: 0 auto;
  }
  .hotel-card {
    background: #fff; border-radius: 14px; overflow: hidden;
    box-shadow: var(--shadow); transition: transform 0.25s;
  }
  .hotel-card:hover { transform: translateY(-5px); }
  .hotel-card-thumb {
    height: 160px; display: flex; align-items: center;
    justify-content: center; font-size: 3rem; position: relative;
  }
  .hotel-badge {
    position: absolute; top: 10px; left: 10px;
    background: var(--gold); color: var(--dark);
    font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 20px;
  }
  .hotel-loc-tag {
    position: absolute; bottom: 10px; right: 10px;
    background: rgba(0,0,0,0.6); color: #fff;
    font-size: 0.72rem; padding: 4px 10px; border-radius: 20px;
  }
  .hotel-body { padding: 18px; }
  .hotel-body h3 { color: var(--dark); margin-bottom: 6px; font-size: 1.05rem; }
  .hotel-stars { color: var(--gold); font-size: 0.85rem; margin-bottom: 8px; }
  .hotel-desc { color: #888; font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px; }
  .amenities { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .amenities span {
    font-size: 0.78rem; color: #666; background: #f0f0f0;
    padding: 4px 10px; border-radius: 20px;
  }
  .hotel-footer { display: flex; align-items: center; justify-content: space-between; }
  .hotel-price .from  { font-size: 0.75rem; color: #999; }
  .hotel-price .amt   { font-size: 1.3rem; font-weight: 900; color: var(--dark); font-family: 'Playfair Display', serif; }
  .hotel-price .night { font-size: 0.75rem; color: #999; }
  .book-btn {
    background: var(--gold); color: var(--dark); border: none;
    padding: 8px 18px; border-radius: 6px; cursor: pointer;
    font-weight: 700; font-size: 0.85rem; transition: background 0.2s;
  }
  .book-btn:hover { background: #e6c060; }
  .hotel-no-results { text-align: center; padding: 60px 20px; color: #888; }
  .hotel-no-results i { font-size: 2rem; margin-bottom: 12px; display: block; }
  .hotel-no-results h3 { color: #555; margin-bottom: 8px; }

  /* ── EVENTS ── */
  .events-tabs { display: flex; gap: 10px; flex-wrap: wrap; max-width: 1100px; margin: 0 auto 28px; }
  .tab-btn {
    background: #f0f0f0; border: none; padding: 9px 20px; border-radius: 20px;
    cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s;
  }
  .tab-btn.active { background: var(--dark); color: #fff; }
  .events-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; max-width: 1100px; margin: 0 auto;
  }
  .event-card {
    background: #fff; border-radius: 14px; overflow: hidden;
    box-shadow: var(--shadow); cursor: pointer; transition: transform 0.25s;
  }
  .event-card:hover { transform: translateY(-5px); }
  .event-thumb {
    height: 150px; display: flex; align-items: center;
    justify-content: center; font-size: 3.5rem; position: relative;
  }
  .event-cat-tag {
    position: absolute; top: 10px; left: 10px;
    font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 20px;
  }
  .tag-religious { background: #e8f4fd; color: #2980b9; }
  .tag-festival  { background: #fef9e7; color: #f39c12; }
  .tag-cultural  { background: #f0fff4; color: #27ae60; }
  .tag-sport     { background: #fef5e7; color: #e67e22; }
  .event-date-badge {
    position: absolute; bottom: 10px; right: 10px;
    background: var(--dark); color: #fff; text-align: center;
    padding: 6px 10px; border-radius: 8px;
  }
  .event-date-badge .day { display: block; font-size: 1.2rem; font-weight: 900; line-height: 1; }
  .event-date-badge .mon { display: block; font-size: 0.7rem; text-transform: uppercase; }
  .event-body { padding: 16px; }
  .event-body h3 { color: var(--dark); margin-bottom: 8px; }
  .event-meta { display: flex; gap: 14px; font-size: 0.8rem; color: #888; margin-bottom: 10px; }
  .event-desc { color: #666; font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px; }
  .event-footer { display: flex; justify-content: space-between; align-items: center; }
  .status-upcoming { background: #e8f4fd; color: #2980b9; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
  .status-ongoing  { background: #fdecea; color: #c0392b; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
  .learn-btn {
    background: none; border: 1.5px solid var(--gold); color: var(--gold);
    padding: 6px 14px; border-radius: 6px; cursor: pointer;
    font-size: 0.8rem; font-weight: 700; transition: all 0.2s;
  }
  .learn-btn:hover { background: var(--gold); color: var(--dark); }

  /* ── WHY VISIT ── */
  .why-visit { background: var(--dark); padding: 60px 20px; }
  .why-visit .section-title h2 { color: #fff; }
  .why-visit .section-title p  { color: #aaa; }
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px; max-width: 1000px; margin: 0 auto;
  }
  .feature-item {
    text-align: center; padding: 32px 20px;
    background: rgba(255,255,255,0.05); border-radius: 12px;
    border: 1px solid rgba(201,168,76,0.2);
  }
  .feature-item i { font-size: 2.2rem; color: var(--gold); margin-bottom: 14px; display: block; }
  .feature-item h3 { color: #fff; font-size: 1rem; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.62);
    z-index: 1000; display: flex; align-items: center;
    justify-content: center; padding: 20px;
  }
  .modal-box {
    background: #fff; border-radius: 16px; max-width: 480px; width: 100%;
    padding: 36px; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  .modal-close {
    position: absolute; top: 16px; right: 16px;
    background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #888;
  }
  .modal-box h2 { font-size: 1.6rem; color: var(--dark); margin: 12px 0 8px; }
  .modal-meta { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; font-size: 0.9rem; color: #666; }
  .modal-meta div { display: flex; align-items: center; gap: 8px; }
  .modal-meta i { color: var(--gold); width: 16px; }
  .modal-desc { color: #555; line-height: 1.7; margin-bottom: 24px; }
  .modal-ok {
    background: var(--dark); color: #fff; border: none;
    padding: 12px 28px; border-radius: 8px; cursor: pointer;
    font-weight: 700; width: 100%; font-size: 0.95rem; transition: background 0.2s;
  }
  .modal-ok:hover { background: #333; }

  /* ── PAGE BANNER ── */
  .page-banner {
    background: linear-gradient(135deg, var(--dark), #16213e);
    padding: 80px 20px; text-align: center;
  }
  .page-banner h1 { color: #fff; font-size: 3rem; }
  .page-banner p  { color: var(--gold); margin-top: 10px; font-size: 1.05rem; }

  /* ── DESTINATIONS PAGE ── */
  .dest-page-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px; max-width: 1100px; margin: 0 auto; padding: 40px 20px;
  }
  .dest-place { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: var(--shadow); }
  .dest-place-thumb { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
  .dest-place-body { padding: 20px; }
  .dest-place-body h3 { color: var(--dark); margin-bottom: 6px; }
  .dest-place-body p  { color: #888; font-size: 0.9rem; margin-bottom: 12px; }
  .stars { color: var(--gold); font-size: 0.9rem; margin-bottom: 4px; }
  .rating-text { font-size: 0.85rem; color: #888; margin-bottom: 14px; }
  .map-btn {
    background: transparent; border: 1.5px solid var(--gold); color: var(--gold);
    padding: 7px 16px; border-radius: 6px; cursor: pointer;
    font-size: 0.82rem; font-weight: 700; margin-bottom: 12px;
    transition: all 0.2s; display: inline-block;
  }
  .map-btn:hover { background: var(--gold); color: var(--dark); }

  /* ── COMMENTS ── */
  .comment-section { margin-top: 14px; }
  .comment-input-wrap { display: flex; gap: 8px; }
  .comment-input-wrap input {
    flex: 1; padding: 9px 12px; border: 1.5px solid #e0e0e0;
    border-radius: 6px; font-size: 0.85rem; outline: none;
    font-family: 'Lato', sans-serif; transition: border 0.2s;
  }
  .comment-input-wrap input:focus { border-color: var(--gold); }
  .comment-input-wrap button {
    background: var(--dark); color: #fff; border: none;
    padding: 9px 14px; border-radius: 6px; cursor: pointer;
    font-size: 0.82rem; font-weight: 700; transition: background 0.2s;
  }
  .comment-input-wrap button:hover { background: var(--gold); color: var(--dark); }
  .comments-list { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
  .comment-item {
    background: #f8f8f8; border-radius: 6px; padding: 8px 12px;
    font-size: 0.82rem; color: #555; border-left: 3px solid var(--gold);
  }
  .comment-item .comment-author { font-weight: 700; color: var(--dark); margin-right: 6px; }
  .comment-item .comment-time   { font-size: 0.75rem; color: #aaa; margin-left: 6px; }

  /* ── TRAVEL TIPS ── */
  .tips-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px; max-width: 1000px; margin: 0 auto;
  }
  .tip-card {
    background: #fff; border-radius: 12px; padding: 28px 22px;
    text-align: center; box-shadow: var(--shadow);
  }
  .tip-card i { font-size: 2rem; color: var(--gold); margin-bottom: 12px; display: block; }
  .tip-card h3 { color: var(--dark); margin-bottom: 8px; }
  .tip-card p  { color: #888; font-size: 0.9rem; line-height: 1.6; }

  /* ── GALLERY ── */
  .gallery-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px; max-width: 1100px; margin: 0 auto;
  }
  .gallery-item { border-radius: 12px; overflow: hidden; height: 200px; position: relative; cursor: pointer; }
  .gallery-thumb { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; transition: transform 0.3s; }
  .gallery-item:hover .gallery-thumb { transform: scale(1.06); }
  .gallery-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    padding: 20px 14px 14px; color: #fff; font-size: 0.9rem; font-weight: 700;
  }

  /* ── FOODS SECTION (inside Gallery) ── */
  .foods-section { background: #f9f9f9; padding: 60px 20px; margin-top: 40px; }
  .foods-tabs { display: flex; gap: 10px; flex-wrap: wrap; max-width: 1100px; margin: 0 auto 28px; }
  .food-tab {
    background: #f0f0f0; border: none; padding: 9px 20px; border-radius: 20px;
    cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s;
  }
  .food-tab.active { background: var(--dark); color: #fff; }
  .foods-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 24px; max-width: 1100px; margin: 0 auto;
  }
  .food-card {
    background: #fff; border-radius: 14px; overflow: hidden;
    box-shadow: var(--shadow); cursor: pointer; transition: transform 0.25s;
  }
  .food-card:hover { transform: translateY(-5px); }
  .food-thumb {
    height: 150px; display: flex; align-items: center;
    justify-content: center; font-size: 3.5rem; position: relative;
  }
  .food-cat-tag {
    position: absolute; top: 10px; left: 10px;
    font-size: 0.72rem; font-weight: 700; padding: 4px 10px; border-radius: 20px;
  }
  .tag-rice    { background: #fff3e0; color: #e65100; }
  .tag-snack   { background: #f3e5f5; color: #7b1fa2; }
  .tag-sweet   { background: #fce4ec; color: #c62828; }
  .tag-seafood { background: #e3f2fd; color: #1565c0; }
  .food-body   { padding: 16px; }
  .food-body h3 { color: var(--dark); margin-bottom: 8px; }
  .food-meta   { display: flex; gap: 12px; font-size: 0.8rem; color: #888; margin-bottom: 10px; }
  .food-desc   { color: #666; font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px; }
  .food-footer { display: flex; justify-content: space-between; align-items: center; }
  .food-status {
    background: #f0f0f0; color: #555; font-size: 0.75rem;
    font-weight: 700; padding: 4px 10px; border-radius: 20px;
  }

  /* ── MAP PAGE ── */
  .map-page-wrap {
    max-width: 1100px; margin: 0 auto; padding: 40px 20px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;
  }
  @media (max-width: 700px) { .map-page-wrap { grid-template-columns: 1fr; } }
  .map-page-wrap iframe { width: 100%; height: 500px; border: none; border-radius: 12px; box-shadow: var(--shadow); }
  .map-page-text h2 { color: var(--dark); font-size: 1.8rem; margin-bottom: 14px; }
  .map-page-text p  { color: #666; line-height: 1.8; }

  /* ── OUR STORY ── */
  .story-wrap { max-width: 900px; margin: 0 auto; padding: 60px 20px; }
  .story-wrap h2 { color: var(--dark); margin-bottom: 14px; font-size: 1.8rem; }
  .story-wrap p  { color: #666; line-height: 1.8; margin-bottom: 28px; }
  .vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
  @media (max-width: 600px) { .vm-grid { grid-template-columns: 1fr; } }
  .vm-box {
    background: #fff; border-radius: 12px; padding: 24px;
    box-shadow: var(--shadow); border-left: 4px solid var(--gold);
  }
  .vm-box h3 { color: var(--dark); margin-bottom: 10px; }
  .vm-box p  { color: #888; font-size: 0.9rem; line-height: 1.6; }
  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
  .service-box { background: #fff; border-radius: 10px; padding: 20px; box-shadow: var(--shadow); }
  .service-box h4 { color: var(--dark); margin-bottom: 8px; }
  .service-box p  { color: #888; font-size: 0.85rem; line-height: 1.5; }

  /* ── CONTACT ── */
  .contact-wrap {
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
    max-width: 900px; margin: 0 auto; padding: 60px 20px;
  }
  @media (max-width: 600px) { .contact-wrap { grid-template-columns: 1fr; } }
  .contact-info h3 { color: var(--gold); font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; margin-top: 18px; }
  .contact-info h3:first-child { margin-top: 0; }
  .contact-info p  { color: #555; }
  .social-icons    { display: flex; gap: 12px; margin-top: 12px; }
  .social-icons a  { color: #888; font-size: 1.3rem; transition: color 0.2s; text-decoration: none; }
  .social-icons a:hover { color: var(--gold); }
  .contact-form { display: flex; flex-direction: column; gap: 14px; }
  .contact-form input,
  .contact-form textarea {
    padding: 12px 16px; border: 1.5px solid #e0e0e0; border-radius: 8px;
    font-family: 'Lato', sans-serif; font-size: 0.95rem; outline: none; transition: border 0.2s;
  }
  .contact-form input:focus,
  .contact-form textarea:focus { border-color: var(--gold); }
  .contact-form button {
    background: var(--dark); color: #fff; border: none;
    padding: 14px; border-radius: 8px; cursor: pointer;
    font-weight: 700; font-size: 1rem; transition: background 0.2s;
  }
  .contact-form button:hover { background: var(--gold); color: var(--dark); }
  .contact-success { text-align: center; padding: 40px; background: #f0fff4; border-radius: 12px; }
  .contact-success i { font-size: 3rem; color: #27ae60; margin-bottom: 14px; display: block; }
  .contact-success h3 { color: #27ae60; margin-bottom: 8px; }
  .contact-success p  { color: #555; }
  .contact-success button {
    margin-top: 20px; background: var(--dark); color: #fff; border: none;
    padding: 10px 24px; border-radius: 8px; cursor: pointer; font-weight: 700;
  }

  /* ── FOOTER ── */
  .footer { background: var(--deep); padding: 48px 20px 0; }
  .footer-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px; max-width: 1100px; margin: 0 auto;
  }
  .footer-section h2  { color: var(--gold); margin-bottom: 10px; font-size: 1.2rem; }
  .footer-section h3  { color: #fff; margin-bottom: 14px; }
  .footer-section p   { color: #888; font-size: 0.9rem; line-height: 1.6; }
  .footer-section ul  { list-style: none; }
  .footer-section ul li a {
    color: #888; text-decoration: none; font-size: 0.9rem;
    line-height: 2.2; transition: color 0.2s; display: block;
  }
  .footer-section ul li a:hover { color: var(--gold); }
  .footer-bottom {
    text-align: center; color: #555; font-size: 0.82rem;
    border-top: 1px solid #222; padding: 24px 20px;
    max-width: 1100px; margin: 32px auto 0;
  }

  /* ── BOOK MODAL specific ── */
  .book-modal-icon { font-size: 2.5rem; color: var(--gold); display: block; text-align: center; margin-bottom: 12px; }
  .book-modal-details { background: #f8f8f8; border-radius: 8px; padding: 16px; margin: 16px 0; }
  .book-modal-details div { display: flex; gap: 8px; align-items: center; color: #555; font-size: 0.9rem; margin-bottom: 8px; }
  .book-modal-details div:last-child { margin-bottom: 0; }
  .book-modal-details i { color: var(--gold); }
`;

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────

/** Hotels data — all 12 properties */
const HOTELS = [
  { id: 1, name: "Sigiriya Village Hotel", loc: "sigiriya", emoji: "🏔", stars: 4, price: 85, desc: "Eco-friendly resort surrounded by jungle, offering stunning views of Sigiriya Rock.", amenities: ["WiFi", "Pool", "Restaurant"], badge: "⭐ Top Pick" },
  { id: 2, name: "Water Garden Sigiriya", loc: "sigiriya", emoji: "💧", stars: 5, price: 210, desc: "Luxury boutique hotel with private plunge pools and serene garden settings.", amenities: ["WiFi", "Spa", "Transfers"] },
  { id: 3, name: "98 Acres Resort", loc: "ella", emoji: "🌿", stars: 5, price: 145, desc: "Panoramic hilltop resort overlooking lush tea estates and the famous Nine Arch Bridge.", amenities: ["WiFi", "Pool", "Trekking"], badge: "⭐ Top Pick" },
  { id: 4, name: "Ella Jungle Resort", loc: "ella", emoji: "🌄", stars: 4, price: 60, desc: "Charming bungalows nestled in a forested hillside with cool mountain air.", amenities: ["WiFi", "Restaurant", "Garden"] },
  { id: 5, name: "Mirissa Hills Hotel", loc: "mirissa", emoji: "🌊", stars: 5, price: 120, desc: "Stunning hilltop hotel with infinity pool and sweeping ocean views over Mirissa Bay.", amenities: ["WiFi", "Pool", "Beach"], badge: "🌊 Beachfront" },
  { id: 6, name: "Weligama Bay Resort", loc: "mirissa", emoji: "🏄", stars: 4, price: 75, desc: "Relaxed beachside resort perfect for whale watching excursions and surfing.", amenities: ["WiFi", "Surfing", "Seafood"] },
  { id: 7, name: "The Kandy House", loc: "kandy", emoji: "🏛", stars: 5, price: 185, desc: "A restored 200-year-old manor house offering authentic Sri Lankan heritage experience.", amenities: ["WiFi", "Spa", "Heritage"], badge: "🏛 Heritage" },
  { id: 8, name: "Earl's Regency Hotel", loc: "kandy", emoji: "🏨", stars: 4, price: 95, desc: "Nestled on a hillside, this hotel offers stunning valley views near the Temple of the Tooth.", amenities: ["WiFi", "Pool", "Transfers"] },
  { id: 9, name: "Amangalla Fort Hotel", loc: "galle", emoji: "🏰", stars: 5, price: 350, desc: "Iconic colonial hotel inside the UNESCO Galle Fort with timeless Dutch colonial architecture.", amenities: ["WiFi", "Spa", "Pool"], badge: "🏰 Luxury" },
  { id: 10, name: "Fort Bazaar Boutique", loc: "galle", emoji: "🌹", stars: 4, price: 130, desc: "Stylish boutique hotel in a restored colonial building within the heart of Galle Fort.", amenities: ["WiFi", "Restaurant", "Cycling"] },
  { id: 11, name: "Chena Huts by Uga", loc: "yala", emoji: "🐆", stars: 5, price: 275, desc: "Exclusive tented camp on the edge of Yala National Park for an immersive wildlife experience.", amenities: ["WiFi", "Safari", "Pool"], badge: "🐆 Safari" },
  { id: 12, name: "Yala Safari Camp", loc: "yala", emoji: "🦁", stars: 4, price: 95, desc: "Comfortable glamping tents near park gates with guided leopard and elephant safaris.", amenities: ["WiFi", "Safari", "Glamping"] },
];

/** Cultural events data */
const EVENTS = [
  { id: 1, name: "Esala Perahera", cat: "religious", day: 19, month: "Aug", loc: "Kandy", duration: "10 Days", emoji: "🐘", status: "upcoming", desc: "Sri Lanka's grandest and most sacred procession celebrating the Sacred Tooth Relic of the Buddha. Features elaborately decorated elephants, traditional dancers, fire performers, and whip crackers." },
  { id: 2, name: "Sinhala & Tamil New Year", cat: "festival", day: 13, month: "Apr", loc: "Island-Wide", duration: "2 Days", emoji: "🎊", status: "upcoming", desc: "The most celebrated national festival marking the traditional new year. Families gather for rituals, games, feasts, and cultural activities island-wide." },
  { id: 3, name: "Vesak Festival", cat: "religious", day: 12, month: "May", loc: "Island-Wide", duration: "2 Days", emoji: "🏮", status: "ongoing", desc: "The most important Buddhist festival illuminating the island with lanterns and dansalas. Streets are decorated with beautiful lanterns and free food is distributed." },
  { id: 4, name: "Galle Literary Festival", cat: "cultural", day: 23, month: "Jan", loc: "Galle Fort", duration: "5 Days", emoji: "📚", status: "upcoming", desc: "A world-class literary festival held inside the historic UNESCO Galle Fort featuring international and local authors, debates, and cultural events." },
  { id: 5, name: "Arugam Bay Surf Festival", cat: "sport", day: 15, month: "Jul", loc: "Arugam Bay", duration: "3 Days", emoji: "🏄", status: "upcoming", desc: "International surf competition on one of the world's top point breaks. Attracts professional surfers from around the globe." },
  { id: 6, name: "Navam Perahera", cat: "religious", day: 11, month: "Feb", loc: "Colombo", duration: "2 Nights", emoji: "🌕", status: "upcoming", desc: "Colombo's spectacular full-moon procession with over 50 elephants, dancers and drummers parading through the streets." },
];

/** Destinations data */
const DESTINATIONS = [
  { name: "Sigiriya", emoji: "🦁", rating: 4, desc: "The legendary Lion Rock fortress rising 200m above the jungle.", map: "https://maps.google.com/?q=Sigiriya", bg: "135deg,#1a3a5c,#0f3460" },
  { name: "Ella", emoji: "🌿", rating: 5, desc: "Iconic Nine Arch Bridge surrounded by lush tea plantations.", map: "https://maps.google.com/?q=Ella+Sri+Lanka", bg: "135deg,#1a4a2e,#0f3020" },
  { name: "Mirissa", emoji: "🐋", rating: 4, desc: "Famous crescent beach ideal for whale watching and surfing.", map: "https://maps.google.com/?q=Mirissa+Beach", bg: "135deg,#1a4a5c,#0f4060" },
  { name: "Sri Dalada Maligawa", emoji: "🏛", rating: 5, desc: "Historic Temple of the Sacred Tooth Relic in the heart of Kandy.", map: "https://maps.google.com/?q=Temple+of+the+Tooth+Kandy", bg: "135deg,#4a3a1a,#3a2a0f" },
  { name: "Yala National Park", emoji: "🐆", rating: 4, desc: "Sri Lanka's most visited wildlife reserve, home to leopards.", map: "https://maps.google.com/?q=Yala+National+Park", bg: "135deg,#3a4a1a,#2a3a0f" },
  { name: "Galle Fort", emoji: "🏰", rating: 5, desc: "A UNESCO World Heritage Dutch colonial fort on the southern tip of Sri Lanka.", map: "https://maps.google.com/?q=Galle+Fort", bg: "135deg,#3a1a1a,#2a0f0f" },
];

/** Traditional foods data */
const FOODS = [
  { id: 1, name: "Rice & Curry", cat: "rice", emoji: "🍛", loc: "Island-Wide", spice: "Mild – Spicy", status: "Must Try", desc: "Sri Lanka's iconic meal — steamed rice with a colourful spread of curries, sambols, and chutneys." },
  { id: 2, name: "Kottu Roti", cat: "snack", emoji: "🥘", loc: "Island-Wide", spice: "Medium", status: "Street Food", desc: "Chopped flatbread stir-fried with vegetables, eggs, and spices — a beloved street food staple." },
  { id: 3, name: "Hoppers (Appa)", cat: "snack", emoji: "🫓", loc: "Colombo, Kandy", spice: "Mild", status: "Breakfast", desc: "Bowl-shaped rice flour crepes, crispy on the edges and soft in the centre — eaten with coconut sambol." },
  { id: 4, name: "Jaffna Crab Curry", cat: "seafood", emoji: "🦀", loc: "Jaffna", spice: "Very Spicy", status: "Regional", desc: "Fiery and fragrant crab curry from the north, cooked with Jaffna spices and coconut milk." },
  { id: 5, name: "Watalappan", cat: "sweet", emoji: "🍮", loc: "Island-Wide", spice: "Dessert", status: "Festive", desc: "A rich coconut custard pudding made with jaggery and spices — a must-try Malay-influenced dessert." },
  { id: 6, name: "Isso Vadai", cat: "seafood", emoji: "🍤", loc: "Negombo, Jaffna", spice: "Medium", status: "Street Food", desc: "Crispy lentil fritters topped with whole prawns — a popular coastal snack sold at beachside stalls." },
  { id: 7, name: "Kavum", cat: "sweet", emoji: "🍩", loc: "Island-Wide", spice: "Dessert", status: "New Year Special", desc: "Traditional deep-fried oil cakes made from rice flour and treacle, prepared especially during New Year." },
  { id: 8, name: "Lamprais", cat: "rice", emoji: "🍱", loc: "Colombo", spice: "Mild", status: "Heritage", desc: "Dutch-Burgher rice dish — rice, curries, and accompaniments wrapped and baked in a banana leaf." },
];

// ─────────────────────────────────────────────
//  SMALL SHARED COMPONENTS
// ─────────────────────────────────────────────

/** Renders 5 star icons, filled up to `count` */
function Stars({ count }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <i key={i} className={i <= count ? "fa-solid fa-star" : "fa-regular fa-star"} />
      ))}
    </div>
  );
}

/**
 * Generic modal overlay.
 * Clicking the backdrop (not the box itself) calls onClose.
 */
function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </button>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────────
const NAV_PAGES = [
  ["home", "Home"],
  ["destinations", "Destinations"],
  ["traveltips", "Travel Tips"],
  ["gallery", "Gallery"],
  ["map", "Map"],
  ["ourstory", "Our Story"],
  ["contact", "Contact"],
];

function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <span className="nav-logo-icon">🦁</span>
        <h2>Explore Sri Lanka</h2>
      </div>

      {/* Navigation links */}
      <ul className="nav-menu">
        {NAV_PAGES.map(([key, label]) => (
          <li key={key}>
            <a
              href="#"
              className={page === key ? "active" : ""}
              onClick={e => { e.preventDefault(); setPage(key); window.scrollTo(0, 0); }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Auth buttons — wired to Contact page (Firebase naha nisa) */}
      <div className="nav-auth">
        <button className="btn-login" onClick={() => setPage("contact")}>Log In</button>
        <button className="btn-signup" onClick={() => setPage("contact")}>Sign Up</button>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
//  HOME PAGE
// ─────────────────────────────────────────────
function HomePage({ setPage }) {
  // Search state
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  // Hotel filter state
  const [hotelFilter, setHotelFilter] = useState("all");
  const [hotelSearch, setHotelSearch] = useState("");

  // Event filter state
  const [eventFilter, setEventFilter] = useState("all");

  // Modal state — hotel booking & event detail
  const [bookModal, setBookModal] = useState(null); // hotel name string
  const [eventModal, setEventModal] = useState(null); // event object

  /** Destination search handler */
  const handleSearch = () => {
    if (!search.trim()) return;
    setSearchResult(`Showing results for: "${search}"`);
  };

  /** Hotel filter — combines location pill + text search */
  const filteredHotels = HOTELS.filter(h => {
    const locMatch = hotelFilter === "all" || h.loc === hotelFilter;
    const searchMatch = !hotelSearch ||
      h.name.toLowerCase().includes(hotelSearch.toLowerCase()) ||
      h.loc.toLowerCase().includes(hotelSearch.toLowerCase());
    return locMatch && searchMatch;
  });

  /** Event filter — by category tab */
  const filteredEvents = EVENTS.filter(e =>
    eventFilter === "all" || e.cat === eventFilter
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <p className="hero-sub">Discover the Pearl of the Indian Ocean</p>
        <h1 className="hero-title">
          <span>Explore </span><span className="gold">Sri Lanka</span>
        </h1>
        <p className="hero-desc">
          Ancient Temples, Pristine Beaches, Lush Mountains &amp; Vibrant Culture —
          Your Unforgettable Journey Starts Here.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => setPage("destinations")}>
            Explore Destinations
          </button>
          <button
            className="btn-outline"
            onClick={() => document.getElementById("hotels-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book Hotels
          </button>
        </div>
      </section>

      {/* ── DESTINATION SEARCH ── */}
      <section className="search-section">
        <div className="search-wrap">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Search destinations..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {searchResult && <p className="search-result">🔍 {searchResult}</p>}
      </section>

      {/* ── MAP + INFO ── */}
      <div className="map-info">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395879.9132757409!2d79.79989522364217!3d7.873053582235165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25e2f0b6d81b3%3A0x3a1778247194aa9e!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1698400000000!5m2!1sen!2slk"
          title="Sri Lanka Map"
          allowFullScreen
          loading="lazy"
        />
        <div className="map-text">
          <h2>Discover the Jewel of the Indian Ocean</h2>
          <p>
            Sri Lanka, the Pearl of the Indian Ocean, is a land of endless wonders. From pristine
            golden beaches and lush tea-covered hills to ancient temples, majestic wildlife, and
            vibrant festivals, every corner tells a story.
          </p>
        </div>
      </div>

      {/* ── POPULAR DESTINATIONS PREVIEW ── */}
      <section className="section">
        <div className="section-title">
          <h2>Popular Destinations</h2>
          <p>Explore Sri Lanka's most iconic places</p>
        </div>
        <div className="dest-preview-grid">
          {[
            { emoji: "🦁", name: "Sigiriya", desc: "UNESCO World Heritage Lion Rock fortress." },
            { emoji: "🌿", name: "Ella", desc: "Nine Arch Bridge, tea plantations and mountain views." },
            { emoji: "🐋", name: "Mirissa", desc: "Famous beach for whale watching." },
            { emoji: "🏛", name: "Sri Dalada Maligawa", desc: "Historic city famous for the Temple of the Tooth." },
          ].map(d => (
            <div
              key={d.name}
              className="dest-preview-card"
              onClick={() => setPage("destinations")}
            >
              <div className="dest-card-thumb"
                style={{ background: `linear-gradient(135deg,#1a3a5c,#0f3460)` }}>
                {d.emoji}
              </div>
              <div className="dest-card-body">
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOTELS SECTION ── */}
      <section className="section" id="hotels-section">
        <div className="section-title">
          <h2>Find Hotels</h2>
          <p>Search hotels by destination across Sri Lanka</p>
        </div>

        {/* Filter bar: text search + location pills */}
        <div className="hotel-filters">
          <div className="hotel-search-box">
            <input
              value={hotelSearch}
              onChange={e => setHotelSearch(e.target.value)}
              placeholder="Search by location (e.g. Ella, Galle, Kandy...)"
            />
            {hotelSearch && (
              <button onClick={() => setHotelSearch("")}>
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
          <div className="pills">
            {["all", "sigiriya", "ella", "mirissa", "kandy", "galle", "yala"].map(loc => (
              <button
                key={loc}
                className={`pill ${hotelFilter === loc ? "active" : ""}`}
                onClick={() => setHotelFilter(loc)}
              >
                {loc === "all" ? "All" : loc.charAt(0).toUpperCase() + loc.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="hotel-count">
          Showing {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""}
        </p>

        {/* Hotel cards or empty state */}
        {filteredHotels.length > 0 ? (
          <div className="hotel-grid">
            {filteredHotels.map(h => (
              <div className="hotel-card" key={h.id}>
                {/* Thumbnail with gradient + emoji */}
                <div
                  className="hotel-card-thumb"
                  style={{ background: `linear-gradient(135deg, hsl(${h.id * 30},40%,25%), hsl(${h.id * 30 + 40},50%,35%))` }}
                >
                  <span style={{ fontSize: "3rem" }}>{h.emoji}</span>
                  {h.badge && <span className="hotel-badge">{h.badge}</span>}
                  <span className="hotel-loc-tag">
                    <i className="fa-solid fa-location-dot" />{" "}
                    {h.loc.charAt(0).toUpperCase() + h.loc.slice(1)}
                  </span>
                </div>

                <div className="hotel-body">
                  <h3>{h.name}</h3>
                  <Stars count={h.stars} />
                  <p className="hotel-desc">{h.desc}</p>

                  {/* Amenity pills */}
                  <div className="amenities">
                    {h.amenities.map(a => <span key={a}>{a}</span>)}
                  </div>

                  {/* Price + Book button */}
                  <div className="hotel-footer">
                    <div className="hotel-price">
                      <span className="from">From </span>
                      <span className="amt">${h.price}</span>
                      <span className="night">/night</span>
                    </div>
                    <button className="book-btn" onClick={() => setBookModal(h.name)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No results state */
          <div className="hotel-no-results">
            <i className="fa-solid fa-magnifying-glass" />
            <h3>No hotels found</h3>
            <p>Try searching for Sigiriya, Ella, Mirissa, Kandy, Galle or Yala</p>
            <button
              className="pill active"
              style={{ marginTop: "14px" }}
              onClick={() => { setHotelFilter("all"); setHotelSearch(""); }}
            >
              Show All Hotels
            </button>
          </div>
        )}
      </section>

      {/* ── CULTURAL EVENTS SECTION ── */}
      <section className="section" style={{ background: "#f9f9f9" }}>
        <div className="section-title">
          <h2>Cultural <span className="gold">Events</span></h2>
          <p>Experience the vibrant festivals and traditions of Sri Lanka</p>
        </div>

        {/* Category filter tabs */}
        <div className="events-tabs">
          {[
            ["all", "🎉 All Events"],
            ["festival", "🎊 Festivals"],
            ["religious", "🙏 Religious"],
            ["cultural", "🎭 Cultural"],
            ["sport", "🏄 Sports"],
          ].map(([val, label]) => (
            <button
              key={val}
              className={`tab-btn ${eventFilter === val ? "active" : ""}`}
              onClick={() => setEventFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Event cards */}
        <div className="events-grid">
          {filteredEvents.map(ev => (
            <div
              key={ev.id}
              className="event-card"
              onClick={() => setEventModal(ev)}
            >
              {/* Thumbnail */}
              <div
                className="event-thumb"
                style={{ background: `linear-gradient(135deg, hsl(${ev.id * 50},35%,20%), hsl(${ev.id * 50 + 60},45%,30%))` }}
              >
                <span style={{ fontSize: "3.5rem" }}>{ev.emoji}</span>
                <span className={`event-cat-tag tag-${ev.cat}`}>
                  {ev.cat.charAt(0).toUpperCase() + ev.cat.slice(1)}
                </span>
                <div className="event-date-badge">
                  <span className="day">{ev.day}</span>
                  <span className="mon">{ev.month}</span>
                </div>
              </div>

              <div className="event-body">
                <h3>{ev.name}</h3>
                <div className="event-meta">
                  <span><i className="fa-solid fa-location-dot" /> {ev.loc}</span>
                  <span><i className="fa-solid fa-clock" /> {ev.duration}</span>
                </div>
                <p className="event-desc">{ev.desc.slice(0, 90)}…</p>
                <div className="event-footer">
                  <span className={ev.status === "ongoing" ? "status-ongoing" : "status-upcoming"}>
                    {ev.status === "ongoing" ? "🔴 Ongoing" : "Upcoming"}
                  </span>
                  <button className="learn-btn">Learn More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY VISIT ── */}
      <section className="why-visit">
        <div className="section-title">
          <h2>Why Visit Sri Lanka</h2>
          <p>Discover what makes the island so special</p>
        </div>
        <div className="features-grid">
          {[
            ["fa-umbrella-beach", "Beautiful Beaches"],
            ["fa-mountain", "Scenic Mountains"],
            ["fa-paw", "Wildlife Safari"],
            ["fa-landmark", "Ancient Culture"],
          ].map(([icon, label]) => (
            <div className="feature-item" key={label}>
              <i className={`fa-solid ${icon}`} />
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOTEL BOOKING CONFIRMATION MODAL ── */}
      {bookModal && (
        <Modal onClose={() => setBookModal(null)}>
          <div style={{ textAlign: "center" }}>
            <i className="fa-solid fa-calendar-check book-modal-icon" />
            <h2>{bookModal}</h2>
            <p style={{ color: "#888", margin: "14px 0", lineHeight: 1.7 }}>
              Your booking request has been received! Our team will contact you shortly
              to confirm your reservation.
            </p>
            <div className="book-modal-details">
              <div><i className="fa-solid fa-envelope" /> Confirmation sent to your email</div>
              <div><i className="fa-solid fa-phone" /> We'll call within 24 hours</div>
            </div>
            <button className="modal-ok" onClick={() => setBookModal(null)}>Got it!</button>
          </div>
        </Modal>
      )}

      {/* ── EVENT DETAIL MODAL ── */}
      {eventModal && (
        <Modal onClose={() => setEventModal(null)}>
          <span className={`event-cat-tag tag-${eventModal.cat}`} style={{ display: "inline-block", marginBottom: "8px" }}>
            {eventModal.cat.charAt(0).toUpperCase() + eventModal.cat.slice(1)}
          </span>
          <h2>{eventModal.name}</h2>
          <div className="modal-meta">
            <div><i className="fa-solid fa-calendar" /> {eventModal.day} {eventModal.month}</div>
            <div><i className="fa-solid fa-location-dot" /> {eventModal.loc}</div>
            <div><i className="fa-solid fa-clock" /> {eventModal.duration}</div>
          </div>
          <p className="modal-desc">{eventModal.desc}</p>
          <button className="modal-ok" onClick={() => setEventModal(null)}>Close</button>
        </Modal>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
//  DESTINATIONS PAGE
//  Comments localStorage walata save karala
//  persist karanawa (Firebase naha nisa)
// ─────────────────────────────────────────────
function DestinationsPage() {
  /**
   * Comments state structure:
   *   { [destinationName]: [{ text, time }, ...] }
   * localStorage key: "slComments"
   */
  const [comments, setComments] = useState(() => {
    try { return JSON.parse(localStorage.getItem("slComments") || "{}"); }
    catch { return {}; }
  });
  const [inputs, setInputs] = useState({});

  // localStorage walata save karanawa comments update wena wita
  useEffect(() => {
    localStorage.setItem("slComments", JSON.stringify(comments));
  }, [comments]);

  /** New comment add karanawa */
  const addComment = (destName) => {
    const text = (inputs[destName] || "").trim();
    if (!text) return;

    const newComment = {
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setComments(prev => ({
      ...prev,
      [destName]: [...(prev[destName] || []), newComment],
    }));

    // Input field clear karanawa
    setInputs(prev => ({ ...prev, [destName]: "" }));
  };

  return (
    <>
      <div className="page-banner">
        <h1>Explore Destinations</h1>
        <p>Discover the most breathtaking places Sri Lanka has to offer</p>
      </div>

      <div className="dest-page-grid">
        {DESTINATIONS.map(d => (
          <div className="dest-place" key={d.name}>
            {/* Destination thumbnail */}
            <div className="dest-place-thumb" style={{ background: `linear-gradient(${d.bg})` }}>
              <span style={{ fontSize: "4rem" }}>{d.emoji}</span>
            </div>

            <div className="dest-place-body">
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
              <Stars count={d.rating} />
              <div className="rating-text"><span>{d.rating}</span>/5</div>

              {/* Google Maps link */}
              <a href={d.map} target="_blank" rel="noreferrer">
                <button className="map-btn">📍 View on Map</button>
              </a>

              {/* ── COMMENT SECTION ── */}
              <div className="comment-section">
                <div className="comment-input-wrap">
                  <input
                    value={inputs[d.name] || ""}
                    onChange={e => setInputs(prev => ({ ...prev, [d.name]: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && addComment(d.name)}
                    placeholder="Leave a review..."
                  />
                  <button onClick={() => addComment(d.name)}>Post</button>
                </div>

                {/* Render existing comments */}
                <div className="comments-list">
                  {(comments[d.name] || []).map((c, i) => (
                    <div key={i} className="comment-item">
                      <span className="comment-author">Anonymous</span>
                      💬 {c.text}
                      <span className="comment-time">{c.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  TRAVEL TIPS PAGE
// ─────────────────────────────────────────────
function TravelTipsPage() {
  const tips = [
    { icon: "fa-passport", title: "Visa", desc: "Most visitors can obtain an ETA online. Valid for 30 days, extendable up to 6 months." },
    { icon: "fa-sun", title: "Best Time to Visit", desc: "West & south coast: December–March. East coast: May–September." },
    { icon: "fa-money-bill", title: "Currency", desc: "Sri Lankan Rupee (LKR). ATMs widely available. USD/EUR accepted at tourist sites." },
    { icon: "fa-train", title: "Getting Around", desc: "Scenic train rides through the Hill Country are a must. Tuk-tuks for short distances." },
    { icon: "fa-shirt", title: "Dress Code", desc: "Cover shoulders and knees when visiting temples." },
    { icon: "fa-utensils", title: "Food", desc: "Try rice & curry, kottu roti, hoppers, and fresh seafood." },
  ];

  return (
    <>
      <div className="page-banner">
        <h1>Travel Tips</h1>
        <p>Everything you need to know before visiting Sri Lanka</p>
      </div>
      <div className="section">
        <div className="tips-grid">
          {tips.map(t => (
            <div key={t.title} className="tip-card">
              <i className={`fa-solid ${t.icon}`} />
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  GALLERY PAGE  (includes Traditional Foods)
// ─────────────────────────────────────────────
function GalleryPage() {
  const [foodFilter, setFoodFilter] = useState("all");
  const [foodModal, setFoodModal] = useState(null); // food object

  const galleryItems = [
    { emoji: "🦁", label: "Sigiriya Rock Fortress", bg: "135deg,#1a3a5c,#0f3460" },
    { emoji: "🌉", label: "Nine Arch Bridge, Ella", bg: "135deg,#1a4a2e,#0f3020" },
    { emoji: "🏖", label: "Mirissa Beach", bg: "135deg,#1a4a5c,#0f4060" },
    { emoji: "🏛", label: "Temple of the Tooth", bg: "135deg,#4a3a1a,#3a2a0f" },
    { emoji: "🐆", label: "Yala Wildlife", bg: "135deg,#3a4a1a,#2a3a0f" },
    { emoji: "🍃", label: "Tea Plantations", bg: "135deg,#1a4a2e,#143320" },
  ];

  const filteredFoods = FOODS.filter(f => foodFilter === "all" || f.cat === foodFilter);

  return (
    <>
      <div className="page-banner">
        <h1>Gallery</h1>
        <p>A visual journey through the Pearl of the Indian Ocean</p>
      </div>

      {/* Photo gallery grid */}
      <div className="section">
        <div className="gallery-grid">
          {galleryItems.map(item => (
            <div key={item.label} className="gallery-item">
              <div className="gallery-thumb" style={{ background: `linear-gradient(${item.bg})` }}>
                {item.emoji}
              </div>
              <div className="gallery-caption">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRADITIONAL FOODS SECTION ── */}
      <div className="foods-section">
        <div className="section-title">
          <h2>Traditional <span className="gold">Foods</span></h2>
          <p>Taste the authentic flavours of Sri Lanka</p>
        </div>

        {/* Food category tabs */}
        <div className="foods-tabs">
          {[
            ["all", "🍽️ All Foods"],
            ["rice", "🍛 Rice & Curry"],
            ["snack", "🥘 Snacks"],
            ["sweet", "🍮 Sweets"],
            ["seafood", "🦞 Seafood"],
          ].map(([val, label]) => (
            <button
              key={val}
              className={`food-tab ${foodFilter === val ? "active" : ""}`}
              onClick={() => setFoodFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Food cards */}
        <div className="foods-grid">
          {filteredFoods.map(food => (
            <div key={food.id} className="food-card" onClick={() => setFoodModal(food)}>
              <div
                className="food-thumb"
                style={{ background: `linear-gradient(135deg, hsl(${food.id * 45},40%,22%), hsl(${food.id * 45 + 50},50%,32%))` }}
              >
                <span style={{ fontSize: "3.5rem" }}>{food.emoji}</span>
                <span className={`food-cat-tag tag-${food.cat}`}>
                  {food.cat.charAt(0).toUpperCase() + food.cat.slice(1)}
                </span>
              </div>
              <div className="food-body">
                <h3>{food.name}</h3>
                <div className="food-meta">
                  <span><i className="fa-solid fa-location-dot" /> {food.loc}</span>
                  <span><i className="fa-solid fa-fire" /> {food.spice}</span>
                </div>
                <p className="food-desc">{food.desc}</p>
                <div className="food-footer">
                  <span className="food-status">{food.status}</span>
                  <button className="learn-btn">Learn More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food detail modal */}
      {foodModal && (
        <Modal onClose={() => setFoodModal(null)}>
          <span className={`food-cat-tag tag-${foodModal.cat}`} style={{ display: "inline-block", marginBottom: "8px" }}>
            {foodModal.cat.charAt(0).toUpperCase() + foodModal.cat.slice(1)}
          </span>
          <h2>{foodModal.name}</h2>
          <div className="modal-meta">
            <div><i className="fa-solid fa-location-dot" /> {foodModal.loc}</div>
            <div><i className="fa-solid fa-fire" /> {foodModal.spice}</div>
          </div>
          <p className="modal-desc">{foodModal.desc}</p>
          <button className="modal-ok" onClick={() => setFoodModal(null)}>Close</button>
        </Modal>
      )}
    </>
  );
}

// ─────────────────────────────────────────────
//  MAP PAGE
// ─────────────────────────────────────────────
function MapPage() {
  return (
    <>
      <div className="page-banner">
        <h1>Explore the Map</h1>
        <p>Find all the amazing destinations across Sri Lanka</p>
      </div>
      <div className="map-page-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395879.9132757409!2d79.79989522364217!3d7.873053582235165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25e2f0b6d81b3%3A0x3a1778247194aa9e!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1698400000000!5m2!1sen!2slk"
          title="Sri Lanka Full Map"
          allowFullScreen
          loading="lazy"
        />
        <div className="map-page-text">
          <h2>Discover the Jewel of the Indian Ocean</h2>
          <p>
            From the ancient ruins of Anuradhapura in the north to the pristine beaches of the south,
            use the map to plan your perfect itinerary.
          </p>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  OUR STORY PAGE
// ─────────────────────────────────────────────
function OurStoryPage() {
  return (
    <>
      <div className="page-banner">
        <h1>Our Story</h1>
        <p>The people behind Explore Sri Lanka</p>
      </div>

      <div className="story-wrap">
        <h2>About Explore Sri Lanka</h2>
        <p>
          Explore Sri Lanka was created with a passion to showcase the beauty, culture, and natural
          wonders of Sri Lanka to travelers from around the world.
        </p>

        <h2>Born from a Love of Sri Lanka</h2>
        <p>
          Founded by passionate travelers and locals who wanted to share the true beauty of our island
          paradise with the world.
        </p>

        {/* Vision & Mission */}
        <div className="vm-grid">
          <div className="vm-box">
            <h3>Our Vision</h3>
            <p>To become the leading travel inspiration platform for Sri Lanka, encouraging sustainable tourism.</p>
          </div>
          <div className="vm-box">
            <h3>Our Mission</h3>
            <p>To connect travelers with the real Sri Lanka — its people, culture, nature, and history.</p>
          </div>
        </div>

        {/* Services */}
        <h2>Our Services</h2>
        <div className="services-grid">
          {[
            ["Destination Guides", "Discover Sri Lanka's most beautiful places."],
            ["Travel Tips", "Helpful information about transportation and culture."],
            ["Hotel Booking", "Find comfortable hotels across Sri Lanka."],
            ["Travel Inspiration", "Stories and photos to inspire your adventure."],
          ].map(([title, desc]) => (
            <div key={title} className="service-box">
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  CONTACT PAGE
// ─────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  /** Form field update helper */
  const updateField = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  /** Form submit — Firebase naha nisa local state walata store karanawa */
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: oya Firebase add karana wita meke idala API call ekak hadanna puluwan
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <div className="page-banner">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-wrap">
        {/* Contact Info */}
        <div className="contact-info">
          <h3>Phone</h3>   <p>+94 77 123 4567</p>
          <h3>Email</h3>   <p>info@example.com</p>
          <h3>Address</h3> <p>123 Galle Road, Colombo 03, Sri Lanka</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook" /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
            <a href="https://x.com/" target="_blank" rel="noreferrer"><i className="fab fa-twitter" /></a>
          </div>
        </div>

        {/* Contact Form / Success State */}
        {sent ? (
          <div className="contact-success">
            <i className="fa-solid fa-circle-check" />
            <h3>Message Sent!</h3>
            <p>We'll get back to you soon.</p>
            <button onClick={() => setSent(false)}>Send Another</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input value={form.name} onChange={updateField("name")} placeholder="Your Name" required />
            <input value={form.email} onChange={updateField("email")} placeholder="Your Email" required type="email" />
            <input value={form.subject} onChange={updateField("subject")} placeholder="Subject" />
            <textarea
              rows={5}
              value={form.message}
              onChange={updateField("message")}
              placeholder="Your Message"
              required
            />
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-section">
          <h2>🦁 Explore Sri Lanka</h2>
          <p>DISCOVER THE PEARL OF THE INDIAN OCEAN</p>
        </div>

        {/* Quick links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            {[["home", "Home"], ["destinations", "Destinations"], ["traveltips", "Travel Tips"], ["gallery", "Gallery"], ["contact", "Contact"]].map(([p, l]) => (
              <li key={p}>
                <a href="#" onClick={e => { e.preventDefault(); setPage(p); window.scrollTo(0, 0); }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Explore Sri Lanka – Discover the true beauty of our island paradise. 🌿</p>
          <p>📞 +94 77 123 4567</p>
          <p>📧 info@example.com</p>
          <div className="social-icons" style={{ marginTop: "12px" }}>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook" /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
            <a href="https://x.com/" target="_blank" rel="noreferrer"><i className="fab fa-twitter" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Explore Sri Lanka. All rights reserved.
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
//  ROOT APP COMPONENT
// ─────────────────────────────────────────────

/** Page key → Component map */
const PAGE_MAP = {
  home: HomePage,
  destinations: DestinationsPage,
  traveltips: TravelTipsPage,
  gallery: GalleryPage,
  map: MapPage,
  ourstory: OurStoryPage,
  contact: ContactPage,
};

export default function App() {
  // Current active page key
  const [page, setPage] = useState("home");

  // Inject global CSS once on mount
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const PageComponent = PAGE_MAP[page] || HomePage;

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main>
        <PageComponent setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </>
  );
}