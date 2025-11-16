'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const templates = [
  { key: 'Portfolio', label: 'Clean', path: '/portfolio', accent: 'from-blue-500 to-cyan-500' },
  { key: 'Portfolio2', label: 'Dark', path: '/portfolio2', accent: 'from-slate-600 to-slate-800' },
  { key: 'Portfolio3', label: 'Colorful', path: '/portfolio3', accent: 'from-purple-500 to-pink-500' },
  { key: 'Portfolio4', label: 'Aesthetic', path: '/portfolio4', accent: 'from-purple-500 to-pink-500' },
];

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('Portfolio');
  const [showRaw, setShowRaw] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) setSelectedTemplate(savedTemplate);
    const savedData = localStorage.getItem('extractedData');
    if (savedData) setPortfolioData(JSON.parse(savedData));
  }, []);

  const onFilePicked = (picked) => {
    if (!picked) return;
    if (picked.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    setFile(picked);
  };

  const handleFileChange = (e) => onFilePicked(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    onFilePicked(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }
    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await axios.post('http://localhost:5000/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (p) => setProgress(Math.round((p.loaded * 100) / p.total)),
      });

      if (res.data && typeof res.data === 'object') {
        setPortfolioData(res.data);
        localStorage.setItem('extractedData', JSON.stringify(res.data));
        setProgress(100);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 900);
    }
  };

  const openPortfolioInNewTab = () => {
    const tpl = templates.find((t) => t.key === selectedTemplate);
    if (tpl) window.open(tpl.path, '_blank');
  };

  const switchTemplate = (direction = 1) => {
    const idx = templates.findIndex((t) => t.key === selectedTemplate);
    const next = templates[(idx + direction + templates.length) % templates.length];
    setSelectedTemplate(next.key);
    localStorage.setItem('selectedTemplate', next.key);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Upload Resume (PDF)</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Upload area */}
        <Card className="p-6">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full rounded-lg border-dashed border-2 p-6 text-center transition-colors ${dragActive ? 'border-primary/80 bg-primary/5' : 'border-border bg-transparent'}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="space-y-4">
              <p className="text-lg font-medium">Drag & drop your PDF here</p>
              <p className="text-sm text-muted-foreground">or</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => inputRef.current?.click()} size="sm">
                  Choose File
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setFile(null); setPortfolioData(null); localStorage.removeItem('extractedData'); }}>
                  Clear
                </Button>
              </div>

              {file && (
                <div className="mt-4 text-left">
                  <p className="font-semibold">Selected:</p>
                  <p className="text-sm">{file.name} · {(file.size / 1024).toFixed(1)} KB</p>
                </div>
              )}

              <div className="mt-6 flex items-center gap-3 justify-center">
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? `Uploading ${progress}%` : 'Upload & Extract'}
                </Button>
                <Button variant="ghost" onClick={() => { setShowRaw((s) => !s); }} >
                  {showRaw ? 'Hide JSON' : 'Show Raw JSON'}
                </Button>
                <Button variant="outline" onClick={() => switchTemplate(-1)}>-</Button>
                <div className="px-3 py-2 rounded border bg-card">
                  <strong>{selectedTemplate}</strong>
                </div>
                <Button variant="outline" onClick={() => switchTemplate(1)}>+</Button>
              </div>

              {progress > 0 && (
                <div className="w-full bg-muted rounded h-2 mt-4">
                  <div style={{ width: `${progress}%` }} className="h-2 bg-primary rounded" />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Preview template</div>
            <div className="flex gap-3">
              {templates.map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setSelectedTemplate(t.key); localStorage.setItem('selectedTemplate', t.key); }}
                  className={`px-3 py-1 rounded text-sm border ${selectedTemplate === t.key ? 'border-primary bg-primary/10' : 'border-border'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={openPortfolioInNewTab} disabled={!portfolioData}>
              Open Portfolio in New Tab
            </Button>
            <a
              download="extracted.json"
              href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(portfolioData || {}, null, 2))}`}
              className={`inline-block ${portfolioData ? '' : 'pointer-events-none opacity-40'}`}
            >
              <Button variant="outline">Download JSON</Button>
            </a>
          </div>
        </Card>

        {/* Right: Preview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-3">Structured Preview</h2>

          {!portfolioData && (
            <div className="text-sm text-muted-foreground">No data yet — upload a resume to see structured content here.</div>
          )}

          {portfolioData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{portfolioData.name || '—'}</h3>
                  <p className="text-sm text-muted-foreground">{portfolioData.email || ''} {portfolioData.phone ? `· ${portfolioData.phone}` : ''}</p>
                </div>
                <div className="text-sm text-muted-foreground">{portfolioData.job_title || ''}</div>
              </div>

              {portfolioData.summary && <p className="text-sm text-foreground/80">{portfolioData.summary}</p>}

              {portfolioData.skills?.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-muted rounded text-sm">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {portfolioData.experience?.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Experience</p>
                  <div className="space-y-3">
                    {portfolioData.experience.map((e, i) => (
                      <div key={i} className="p-3 border rounded bg-background">
                        <div className="flex justify-between">
                          <div className="font-semibold">{e.position || e.role || '—'}</div>
                          <div className="text-sm text-muted-foreground">{e.start_date || e.duration || ''} {e.end_date ? `— ${e.end_date}` : ''}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{e.company}</div>
                        {e.description && <p className="mt-2 text-sm">{e.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolioData.projects?.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Projects</p>
                  <div className="space-y-2">
                    {portfolioData.projects.map((p, i) => (
                      <div key={i} className="p-3 border rounded bg-background">
                        <div className="font-semibold">{p.title}</div>
                        {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showRaw && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Raw JSON</p>
                  <pre className="max-h-72 overflow-auto text-sm bg-muted p-3 rounded text-left">
                    {JSON.stringify(portfolioData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}