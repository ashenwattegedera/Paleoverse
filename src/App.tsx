import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';

const ArchivePage = lazy(() => import('./pages/ArchivePage').then((module) => ({ default: module.ArchivePage })));
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const SpecimenPage = lazy(() => import('./pages/SpecimenPage').then((module) => ({ default: module.SpecimenPage })));

export default function App() {
  return <BrowserRouter><SiteShell><Suspense fallback={<div className="route-loading"><span className="loader-mark" /><span>OPENING FIELD RECORD</span></div>}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/archive" element={<ArchivePage />} />
    <Route path="/specimens/:slug" element={<SpecimenPage />} />
    <Route path="*" element={<SpecimenPage />} />
  </Routes></Suspense></SiteShell></BrowserRouter>;
}
