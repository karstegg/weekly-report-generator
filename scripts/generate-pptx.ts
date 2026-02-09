import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pptxgen from 'pptxgenjs';
import { reportData } from '../src/data/reportData';

type Slide = ReturnType<pptxgen['addSlide']>;

type CardStyle = {
  fill: string;
  line: string;
  titleColor: string;
  bodyColor: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(projectRoot, 'output');

const PPT_W = 10;
const PPT_H = 7.5;
const M = 0.4;

const FOOTER_H = 1.35;
const CONTENT_H = PPT_H - FOOTER_H;

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function webToFsPath(webPath: string) {
  const cleaned = (webPath || '').trim();
  const withoutLeading = cleaned.startsWith('/') ? cleaned.slice(1) : cleaned;
  return path.join(publicDir, withoutLeading);
}

function fileExists(p: string) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let out: string | undefined;
  let overwrite = false;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--out' || a === '-o') {
      out = args[i + 1];
      i++;
      continue;
    }
    if (a === '--overwrite') {
      overwrite = true;
      continue;
    }
  }

  return { out, overwrite };
}

function getNonClobberPath(desiredPath: string) {
  if (!fileExists(desiredPath)) return desiredPath;

  const dir = path.dirname(desiredPath);
  const ext = path.extname(desiredPath) || '.pptx';
  const base = path.basename(desiredPath, ext);
  for (let i = 1; i < 1000; i++) {
    const candidate = path.join(dir, `${base} (${i})${ext}`);
    if (!fileExists(candidate)) return candidate;
  }
  return path.join(dir, `${base} (${Date.now()})${ext}`);
}

function addFooter(slide: Slide) {
  const footerFs = webToFsPath(reportData.footerSrc);
  if (fileExists(footerFs)) {
    slide.addImage({ path: footerFs, x: 0, y: PPT_H - FOOTER_H, w: PPT_W, h: FOOTER_H });
  } else {
    slide.addShape('rect', {
      x: 0,
      y: PPT_H - FOOTER_H,
      w: PPT_W,
      h: FOOTER_H,
      fill: { color: '1F2937' },
      line: { color: '1F2937' },
    });
    slide.addText('Footer image failed to load.', {
      x: 0,
      y: PPT_H - FOOTER_H + 0.4,
      w: PPT_W,
      h: 0.6,
      align: 'center',
      color: 'FFFFFF',
      fontFace: 'Calibri',
      fontSize: 18,
    });
  }
}

function addSlideTitle(slide: Slide, title: string) {
  slide.addText(title, {
    x: M,
    y: 0.35,
    w: PPT_W - 2 * M,
    h: 0.6,
    fontFace: 'Calibri',
    fontSize: 32,
    bold: true,
    color: '1E40AF',
    align: 'center',
    valign: 'middle',
  });
}

function addCard(slide: Slide, x: number, y: number, w: number, h: number, title: string, body: string, style: CardStyle) {
  slide.addShape('roundRect', {
    x,
    y,
    w,
    h,
    fill: { color: style.fill },
    line: { color: style.line },
  });
  slide.addText(title, {
    x: x + 0.2,
    y: y + 0.15,
    w: w - 0.4,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 16,
    bold: true,
    color: style.titleColor,
  });
  slide.addText(body, {
    x: x + 0.2,
    y: y + 0.55,
    w: w - 0.4,
    h: h - 0.75,
    fontFace: 'Calibri',
    fontSize: 13,
    color: style.bodyColor,
    valign: 'top',
  });
}

function availabilityColor(value: number, target: number) {
  if (value >= target) return { fill: '16A34A', text: 'FFFFFF' };
  if (value >= target - 5) return { fill: 'FACC15', text: '111827' };
  return { fill: 'DC2626', text: 'FFFFFF' };
}

function addAvailabilityBars(slide: Slide, items: { label: string; percentage: number; target?: number }[], x: number, y: number, w: number, h: number) {
  const cols = 5;
  const gap = 0.15;
  const colW = (w - gap * (cols - 1)) / cols;
  const boxH = h;

  items.slice(0, cols).forEach((it, i) => {
    const target = typeof it.target === 'number' ? it.target : 85;
    const c = availabilityColor(it.percentage, target);
    const bx = x + i * (colW + gap);

    slide.addShape('roundRect', {
      x: bx,
      y,
      w: colW,
      h: boxH,
      fill: { color: 'F9FAFB' },
      line: { color: 'E5E7EB' },
    });

    slide.addText(it.label, {
      x: bx,
      y: y + 0.15,
      w: colW,
      h: 0.3,
      align: 'center',
      fontFace: 'Calibri',
      fontSize: 14,
      bold: true,
      color: '111827',
    });

    const barX = bx + 0.12;
    const barY = y + 0.55;
    const barW = colW - 0.24;
    const barH = 0.35;

    slide.addShape('roundRect', {
      x: barX,
      y: barY,
      w: barW,
      h: barH,
      fill: { color: 'E5E7EB' },
      line: { color: 'E5E7EB' },
    });

    const pct = Math.max(0, Math.min(it.percentage, 100)) / 100;
    slide.addShape('roundRect', {
      x: barX,
      y: barY,
      w: barW * pct,
      h: barH,
      fill: { color: c.fill },
      line: { color: c.fill },
    });

    slide.addText(`${it.percentage}%`, {
      x: bx,
      y: y + 0.98,
      w: colW,
      h: 0.35,
      align: 'center',
      fontFace: 'Calibri',
      fontSize: 16,
      bold: true,
      color: '111827',
    });
  });
}

function addBullets(slide: Slide, x: number, y: number, w: number, h: number, lines: string[], fontSize: number) {
  const text = lines.filter(Boolean).join('\n');
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: 'Calibri',
    fontSize,
    color: '111827',
    valign: 'top',
    bullet: { indent: fontSize + 6 },
  });
}

function addBlueRibbon(slide: Slide, text: string) {
  const ribbonY = CONTENT_H - 0.85;
  slide.addShape('rect', {
    x: M,
    y: ribbonY,
    w: PPT_W - 2 * M,
    h: 0.7,
    fill: { color: 'DBEAFE' },
    line: { color: '93C5FD' },
  });
  slide.addShape('rect', {
    x: M,
    y: ribbonY,
    w: 0.08,
    h: 0.7,
    fill: { color: '3B82F6' },
    line: { color: '3B82F6' },
  });
  slide.addText(text, {
    x: M + 0.15,
    y: ribbonY + 0.08,
    w: PPT_W - 2 * M - 0.2,
    h: 0.55,
    fontFace: 'Calibri',
    fontSize: 11,
    italic: true,
    color: '1E3A8A',
    valign: 'top',
  });
}

function createTitleSlide(pptx: pptxgen) {
  const slide = pptx.addSlide();

  slide.addText('Weekly Engineering Report', {
    x: M,
    y: 0.6,
    w: 6.4,
    h: 0.8,
    fontFace: 'Calibri',
    fontSize: 40,
    bold: true,
    color: '111827',
  });

  slide.addText(`Week ${reportData.weekNumber}\n${reportData.dateRange}`, {
    x: 7.0,
    y: 0.6,
    w: PPT_W - 7.0 - M,
    h: 0.8,
    fontFace: 'Calibri',
    fontSize: 22,
    bold: true,
    color: '2563EB',
    align: 'right',
  });

  const images = reportData.cover.images || [];
  const quad = [
    { x: 0.6, y: 2.0 },
    { x: 5.2, y: 2.0 },
    { x: 0.6, y: 4.35 },
    { x: 5.2, y: 4.35 },
  ];

  images.slice(0, 4).forEach((img, i) => {
    const fsPath = webToFsPath(img.src);
    if (!fileExists(fsPath)) return;
    slide.addImage({ path: fsPath, x: quad[i].x, y: quad[i].y, w: 4.2, h: 2.3 });
  });

  const logo = images[4];
  if (logo) {
    const fsPath = webToFsPath(logo.src);
    if (fileExists(fsPath)) {
      slide.addImage({ path: fsPath, x: 3.75, y: 6.0, w: 2.5, h: 0.7 });
    }
  }

  addFooter(slide);
}

function createIndexSlide(pptx: pptxgen) {
  const slide = pptx.addSlide();

  slide.addText('INDEX', {
    x: 0,
    y: 0.9,
    w: PPT_W,
    h: 0.8,
    fontFace: 'Calibri',
    fontSize: 44,
    bold: true,
    color: '1E40AF',
    align: 'center',
  });

  const sites = Object.values(reportData.sites);
  const indexItems = [
    'Departmental Overview (HEAL)',
    'Shafts & Winders Performance',
    ...sites.map((s) => `${s.name} Performance Overview`),
    'BEV Performance Overview',
  ];

  const startY = 2.0;
  const rowH = 0.62;

  indexItems.forEach((item, i) => {
    const y = startY + i * rowH;

    slide.addShape('ellipse', {
      x: 1.6,
      y,
      w: 0.5,
      h: 0.5,
      fill: { color: '2563EB' },
      line: { color: '2563EB' },
    });
    slide.addText(String(i + 1), {
      x: 1.6,
      y: y + 0.07,
      w: 0.5,
      h: 0.35,
      align: 'center',
      fontFace: 'Calibri',
      fontSize: 18,
      bold: true,
      color: 'FFFFFF',
    });

    slide.addText(item, {
      x: 2.25,
      y: y + 0.02,
      w: 6.8,
      h: 0.5,
      fontFace: 'Calibri',
      fontSize: 22,
      color: '111827',
    });
  });

  addFooter(slide);
}

function createHealSlide(pptx: pptxgen) {
  const slide = pptx.addSlide();
  addSlideTitle(slide, 'DEPARTMENTAL OVERVIEW (HEAL)');

  const x = M;
  const w = (PPT_W - 2 * M - 0.35) / 2;
  const gapX = 0.35;
  const yTop = 1.2;
  const h = (CONTENT_H - yTop - 0.3 - 0.35) / 2;
  const gapY = 0.35;

  const boxes = [
    { title: 'Highlights', x, y: yTop, fill: 'DCFCE7', line: '86EFAC', iconColor: '16A34A' },
    { title: 'Lowlights', x: x + w + gapX, y: yTop, fill: 'FEE2E2', line: 'FCA5A5', iconColor: 'DC2626' },
    { title: 'Emerging Issues', x, y: yTop + h + gapY, fill: 'FEF9C3', line: 'FDE047', iconColor: 'CA8A04' },
    { title: 'Priorities', x: x + w + gapX, y: yTop + h + gapY, fill: 'DBEAFE', line: '93C5FD', iconColor: '2563EB' },
  ];

  const data = reportData.heal;
  const lists: string[][] = [
    (data.highlights || []).map((i) => `[${i.site}] ${i.text}`),
    (data.lowlights || []).map((i) => `[${i.site}] ${i.text}`),
    (data.emergingIssues || []).map((i) => `[${i.site}] ${i.text}`),
    (data.priorities || []).map((i) => `[${i.site}] ${i.text}`),
  ];

  boxes.forEach((b, idx) => {
    slide.addShape('roundRect', {
      x: b.x,
      y: b.y,
      w,
      h,
      fill: { color: b.fill },
      line: { color: b.line },
    });

    slide.addText(b.title, {
      x: b.x + 0.2,
      y: b.y + 0.1,
      w: w - 0.4,
      h: 0.35,
      fontFace: 'Calibri',
      fontSize: 16,
      bold: true,
      color: b.iconColor,
    });

    addBullets(slide, b.x + 0.25, b.y + 0.5, w - 0.45, h - 0.65, lists[idx], 12);
  });

  addFooter(slide);
}

function createShaftsWindersSlide(pptx: pptxgen) {
  const slide = pptx.addSlide();
  addSlideTitle(slide, 'Shafts & Winders Performance');

  const contentX = 1.0;
  const barW = PPT_W - 2 * contentX;

  function addProgressBar(label: string, value: number, target: number, unit: string, y: number) {
    const pct = Math.min((value / target) * 100, 100);
    const ratio = pct / 100;
    let color = 'DC2626';
    const percentage = (value / target) * 100;
    if (percentage >= 95) color = '16A34A';
    else if (percentage >= 80) color = 'EAB308';

    slide.addText(label, {
      x: contentX,
      y,
      w: 4.8,
      h: 0.25,
      fontFace: 'Calibri',
      fontSize: 16,
      bold: true,
      color: '111827',
    });

    slide.addText(`Target: ${target}${unit}`, {
      x: contentX + 5.2,
      y,
      w: barW - 5.2,
      h: 0.25,
      fontFace: 'Calibri',
      fontSize: 12,
      color: '6B7280',
      align: 'right',
    });

    const by = y + 0.32;
    slide.addShape('roundRect', {
      x: contentX,
      y: by,
      w: barW,
      h: 0.28,
      fill: { color: 'E5E7EB' },
      line: { color: 'E5E7EB' },
    });

    slide.addShape('roundRect', {
      x: contentX,
      y: by,
      w: barW * ratio,
      h: 0.28,
      fill: { color },
      line: { color },
    });

    slide.addText(`${value}${unit}`, {
      x: contentX,
      y: by - 0.01,
      w: barW * ratio,
      h: 0.28,
      fontFace: 'Calibri',
      fontSize: 14,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      valign: 'middle',
    });
  }

  addProgressBar('Weekly Tons/Hr', reportData.shaftsAndWinders.production.tonsPerHour.value, reportData.shaftsAndWinders.production.tonsPerHour.target, '', 1.2);
  addProgressBar('Weekly RW Availability (%)', reportData.shaftsAndWinders.production.rockWinderAvailability.value, reportData.shaftsAndWinders.production.rockWinderAvailability.target, '%', 2.1);

  const x = M;
  const w = (PPT_W - 2 * M - 0.35) / 2;
  const gapX = 0.35;
  const yTop = 3.1;
  const h = (CONTENT_H - yTop - 0.3 - 0.35) / 2;
  const gapY = 0.35;

  const boxes = [
    { title: 'Highlights', x, y: yTop, fill: 'DCFCE7', line: '86EFAC', color: '166534' },
    { title: 'Lowlights', x: x + w + gapX, y: yTop, fill: 'FEE2E2', line: 'FCA5A5', color: '991B1B' },
    { title: 'Emerging Issues', x, y: yTop + h + gapY, fill: 'FEF9C3', line: 'FDE047', color: '92400E' },
    { title: 'Priorities', x: x + w + gapX, y: yTop + h + gapY, fill: 'DBEAFE', line: '93C5FD', color: '1E40AF' },
  ];

  const data = reportData.shaftsAndWinders.heal;
  const lists: string[][] = [
    data.highlights || [],
    data.lowlights || [],
    data.emergingIssues || [],
    data.priorities || [],
  ];

  boxes.forEach((b, idx) => {
    slide.addShape('roundRect', {
      x: b.x,
      y: b.y,
      w,
      h,
      fill: { color: b.fill },
      line: { color: b.line },
    });

    slide.addText(b.title, {
      x: b.x + 0.2,
      y: b.y + 0.1,
      w: w - 0.4,
      h: 0.35,
      fontFace: 'Calibri',
      fontSize: 16,
      bold: true,
      color: b.color,
    });

    addBullets(slide, b.x + 0.25, b.y + 0.5, w - 0.45, h - 0.65, lists[idx], 12);
  });

  addFooter(slide);
}

function createTrendChartSlide(pptx: pptxgen, title: string, src: string) {
  const slide = pptx.addSlide();
  addSlideTitle(slide, title);

  const fsPath = webToFsPath(src);
  if (fileExists(fsPath)) {
    slide.addImage({ path: fsPath, x: M, y: 1.2, w: PPT_W - 2 * M, h: CONTENT_H - 1.55 });
  } else {
    slide.addShape('rect', {
      x: M,
      y: 1.2,
      w: PPT_W - 2 * M,
      h: CONTENT_H - 1.55,
      fill: { color: 'F9FAFB' },
      line: { color: 'D1D5DB' },
    });

    slide.addText('Trend Chart Placeholder', {
      x: M,
      y: 2.6,
      w: PPT_W - 2 * M,
      h: 0.5,
      fontFace: 'Calibri',
      fontSize: 20,
      bold: true,
      align: 'center',
      color: '4B5563',
    });

    slide.addText(path.basename(src), {
      x: M,
      y: 3.15,
      w: PPT_W - 2 * M,
      h: 0.35,
      fontFace: 'Calibri',
      fontSize: 12,
      align: 'center',
      color: '6B7280',
    });

    slide.addText('(Pending system recovery)', {
      x: M,
      y: 3.55,
      w: PPT_W - 2 * M,
      h: 0.35,
      fontFace: 'Calibri',
      fontSize: 11,
      align: 'center',
      color: '9CA3AF',
    });
  }

  addFooter(slide);
}

function createSitePerformanceSlide(pptx: pptxgen, siteKey: keyof typeof reportData.sites) {
  const site = reportData.sites[siteKey as string];
  const slide = pptx.addSlide();
  addSlideTitle(slide, `${site.name} Performance Overview`);

  const cardY = 1.25;
  const cardH = 1.35;
  const gap = 0.25;
  const cardW = (PPT_W - 2 * M - 2 * gap) / 3;

  const safetyStyle: CardStyle =
    site.safety.status === 'Good'
      ? { fill: 'DCFCE7', line: '86EFAC', titleColor: '166534', bodyColor: '166534' }
      : { fill: 'FFEDD5', line: 'FDBA74', titleColor: '9A3412', bodyColor: '9A3412' };

  let weeklyStyle: CardStyle = { fill: 'FEE2E2', line: 'FCA5A5', titleColor: '991B1B', bodyColor: '991B1B' };
  if (site.weeklyAverage.value >= site.weeklyAverage.target) {
    weeklyStyle = { fill: 'DCFCE7', line: '86EFAC', titleColor: '166534', bodyColor: '166534' };
  } else if (site.weeklyAverage.value >= site.weeklyAverage.target - 5) {
    weeklyStyle = { fill: 'FEF9C3', line: 'FDE047', titleColor: '92400E', bodyColor: '92400E' };
  }

  const complianceStyle: CardStyle =
    site.serviceCompliance.status === 'Good'
      ? { fill: 'DCFCE7', line: '86EFAC', titleColor: '166534', bodyColor: '166534' }
      : { fill: 'FEF9C3', line: 'FDE047', titleColor: '92400E', bodyColor: '92400E' };

  addCard(slide, M, cardY, cardW, cardH, 'Safety', site.safety.details || '', safetyStyle);
  addCard(
    slide,
    M + cardW + gap,
    cardY,
    cardW,
    cardH,
    'Weekly Avg.',
    `${site.weeklyAverage.value}% (Target: ${site.weeklyAverage.target}%)`,
    weeklyStyle
  );
  addCard(slide, M + (cardW + gap) * 2, cardY, cardW, cardH, 'Compliance', site.serviceCompliance.details || '', complianceStyle);

  slide.addText('Equipment Availability', {
    x: M,
    y: 2.75,
    w: PPT_W - 2 * M,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 18,
    bold: true,
    color: '111827',
    align: 'center',
  });

  addAvailabilityBars(slide, site.availability || [], M, 3.15, PPT_W - 2 * M, 1.3);

  slide.addText('Key Breakdowns / Issues', {
    x: M,
    y: 4.55,
    w: PPT_W - 2 * M,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 18,
    bold: true,
    color: '111827',
    align: 'center',
  });

  const breakdowns = (site.keyBreakdowns || []).slice(0);
  const left = breakdowns.filter((_, i) => i % 2 === 0);
  const right = breakdowns.filter((_, i) => i % 2 === 1);

  function addBreakdownColumn(items: { equipment: string; details: string[] }[], x: number) {
    let y = 4.95;
    items.forEach((b) => {
      slide.addText(b.equipment, {
        x,
        y,
        w: 4.6,
        h: 0.25,
        fontFace: 'Calibri',
        fontSize: 14,
        bold: true,
        color: 'B91C1C',
      });
      y += 0.28;
      addBullets(slide, x + 0.15, y, 4.6, 0.75, b.details || [], 12);
      y += 0.82;
    });
  }

  addBreakdownColumn(left, M);
  addBreakdownColumn(right, M + 4.95);

  if (site.trendChart.comment) {
    addBlueRibbon(slide, site.trendChart.comment);
  }

  addFooter(slide);
}

function createBevSlide(pptx: pptxgen) {
  const slide = pptx.addSlide();
  addSlideTitle(slide, reportData.bev.name);

  const topY = 1.2;
  const cardH = 1.65;
  const cardW = (PPT_W - 2 * M - 0.35) / 2;
  const gap = 0.35;

  const availGood = reportData.bev.availability.every((i) => i.value >= i.target);
  const compGood = reportData.bev.serviceCompliance.every((i) => i.value === 100 || i.value === null);

  const availStyle: CardStyle = availGood
    ? { fill: 'DCFCE7', line: '86EFAC', titleColor: '166534', bodyColor: '166534' }
    : { fill: 'FFEDD5', line: 'FDBA74', titleColor: '9A3412', bodyColor: '9A3412' };

  const compStyle: CardStyle = compGood
    ? { fill: 'DCFCE7', line: '86EFAC', titleColor: '166534', bodyColor: '166534' }
    : { fill: 'FEF9C3', line: 'FDE047', titleColor: '92400E', bodyColor: '92400E' };

  const availLines = reportData.bev.availability.map((a) => `${a.label}: ${a.value}% (Target: ${a.target}%)`);
  const compLines = reportData.bev.serviceCompliance.map((c) => `${c.label}: ${c.value === null ? 'None scheduled' : `${c.value}%`}`);

  addCard(slide, M, topY, cardW, cardH, `BEV Availability (Wk ${reportData.weekNumber})`, availLines.join('\n'), availStyle);
  addCard(slide, M + cardW + gap, topY, cardW, cardH, 'BEV Service Compliance', compLines.join('\n'), compStyle);

  slide.addText('BEV Availability by Equipment Type', {
    x: M,
    y: 3.05,
    w: PPT_W - 2 * M,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 18,
    bold: true,
    color: '111827',
    align: 'center',
  });

  const barsX = M;
  const barsY = 3.45;
  const barsW = PPT_W - 2 * M;
  const rowH = 0.75;

  reportData.bev.availability.forEach((a, idx) => {
    const y = barsY + idx * rowH;
    slide.addText(a.label, {
      x: barsX,
      y,
      w: 3.0,
      h: 0.25,
      fontFace: 'Calibri',
      fontSize: 14,
      bold: true,
      color: '111827',
    });
    slide.addText(`Target: ${a.target}%`, {
      x: barsX + 3.1,
      y,
      w: barsW - 3.1,
      h: 0.25,
      fontFace: 'Calibri',
      fontSize: 11,
      color: '6B7280',
      align: 'right',
    });

    const by = y + 0.3;
    slide.addShape('roundRect', {
      x: barsX,
      y: by,
      w: barsW,
      h: 0.28,
      fill: { color: 'E5E7EB' },
      line: { color: 'E5E7EB' },
    });

    const c = a.value >= a.target ? { fill: '16A34A', text: 'FFFFFF' } : { fill: 'FACC15', text: '111827' };
    const ratio = Math.max(0, Math.min(a.value, 100)) / 100;
    slide.addShape('roundRect', {
      x: barsX,
      y: by,
      w: barsW * ratio,
      h: 0.28,
      fill: { color: c.fill },
      line: { color: c.fill },
    });

    slide.addText(`${a.value}%`, {
      x: barsX,
      y: by - 0.01,
      w: barsW * ratio,
      h: 0.28,
      fontFace: 'Calibri',
      fontSize: 13,
      bold: true,
      color: c.text,
      align: 'center',
      valign: 'middle',
    });
  });

  slide.addText('Key BEV & Battery Themes', {
    x: M,
    y: 4.95,
    w: PPT_W - 2 * M,
    h: 0.35,
    fontFace: 'Calibri',
    fontSize: 18,
    bold: true,
    color: '111827',
    align: 'center',
  });

  const colW = (PPT_W - 2 * M - 0.4) / 2;
  const leftX = M;
  const rightX = M + colW + 0.4;
  const listsY = 5.35;
  const listsH = CONTENT_H - listsY - 0.25;

  slide.addText('Key Breakdowns:', {
    x: leftX,
    y: listsY,
    w: colW,
    h: 0.25,
    fontFace: 'Calibri',
    fontSize: 14,
    bold: true,
    color: '92400E',
  });

  let y = listsY + 0.3;
  reportData.bev.breakdowns.forEach((b) => {
    slide.addText(b.equipment, {
      x: leftX,
      y,
      w: colW,
      h: 0.22,
      fontFace: 'Calibri',
      fontSize: 12,
      bold: true,
      color: '111827',
    });
    y += 0.24;
    addBullets(slide, leftX + 0.15, y, colW - 0.15, 0.75, b.details || [], 10);
    y += 0.78;
  });

  slide.addText('Key Battery Themes:', {
    x: rightX,
    y: listsY,
    w: colW,
    h: 0.25,
    fontFace: 'Calibri',
    fontSize: 14,
    bold: true,
    color: '92400E',
  });

  addBullets(slide, rightX + 0.15, listsY + 0.3, colW - 0.15, listsH - 0.3, reportData.bev.batteryThemes || [], 10);

  addFooter(slide);
}

async function main() {
  ensureDir(outputDir);

  const { out, overwrite } = parseArgs(process.argv);

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_4x3';

  createTitleSlide(pptx);
  createIndexSlide(pptx);
  createHealSlide(pptx);
  createShaftsWindersSlide(pptx);

  createTrendChartSlide(pptx, `${reportData.sites.n3.name} Weekly Availability Trend`, reportData.sites.n3.trendChart.src);
  createSitePerformanceSlide(pptx, 'n3');

  createTrendChartSlide(pptx, `${reportData.sites.n2.name} Weekly Availability Trend`, reportData.sites.n2.trendChart.src);
  createSitePerformanceSlide(pptx, 'n2');

  createTrendChartSlide(pptx, `${reportData.sites.gloria.name} Weekly Availability Trend`, reportData.sites.gloria.trendChart.src);
  createSitePerformanceSlide(pptx, 'gloria');

  createBevSlide(pptx);

  const defaultName = `Production Engineering Weekly Report - Week ${reportData.weekNumber}.pptx`;
  const desiredOutPath = out
    ? path.isAbsolute(out)
      ? out
      : path.join(projectRoot, out)
    : path.join(outputDir, defaultName);

  const outPath = overwrite ? desiredOutPath : getNonClobberPath(desiredOutPath);
  ensureDir(path.dirname(outPath));

  await pptx.writeFile({ fileName: outPath });
  console.log(`PPTX written: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
