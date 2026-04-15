import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { redirectMap } from '../data/dados';
import Modal from '../components/Modal';

const IconEye = ({ open }) => open ? (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [detectedProfile, setDetectedProfile] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const detect = (u, p) => {
    if (!u || !p) return setDetectedProfile('');
    const profile = login(u, p);
    // Don't actually log in yet, just detect
    setDetectedProfile(profile ? `Perfil detectado: ${profile}` : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    const profile = login(username, password);
    if (!profile) {
      setError('Credenciais inválidas. Use os exemplos no menu de ajuda para testar.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigate(redirectMap[profile]);
    }, 800);
  };

  return (
    <>
      <div className="login-wrapper position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a4480 0%, #0d2f5c 50%, #1a4480 100%)',
        backgroundSize: '400% 400%',
      }}>
        <div className="login-decoration login-decoration-1" style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', top: -100, left: -100, pointerEvents: 'none',
        }} />
        <div className="login-decoration login-decoration-2" style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', bottom: -150, right: -100, pointerEvents: 'none',
        }} />

        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">SGE</div>
            <h1 className="login-title">Sistema de Escola Conectada</h1>
            <p className="login-subtitle mb-0">Ministério da Educação de Angola</p>
          </div>

          <div className="login-body">
            {error && (
              <div className="alert alert-danger py-2 mb-3" role="alert">{error}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Utilizador ou BI</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Digite o seu utilizador ou BI"
                  value={username}
                  onChange={e => { setUsername(e.target.value); detect(e.target.value, password); }}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Palavra-passe</label>
                <div className="position-relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Digite a sua palavra-passe"
                    value={password}
                    onChange={e => { setPassword(e.target.value); detect(username, e.target.value); }}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
                    style={{ zIndex: 10 }}
                    onClick={() => setShowPass(p => !p)}
                  >
                    <IconEye open={showPass} />
                  </button>
                </div>
              </div>

              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Lembrar-me</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg"
                disabled={loading}
              >
                {loading
                  ? <><span className="spinner-border spinner-border-sm me-2" />A entrar...</>
                  : 'Entrar'
                }
              </button>

              {detectedProfile && (
                <div className="small text-success mt-2">{detectedProfile}</div>
              )}

              <div className="text-center mt-3">
                <button
                  type="button"
                  className="text-muted small btn btn-link p-0"
                  onClick={() => setShowHelp(true)}
                >
                  Esqueceu a palavra-passe?
                </button>
              </div>
            </form>
          </div>

          <div className="login-footer">
            <p className="mb-0">Sistema de Escola Conectada © 2026</p>
            <p className="mb-0">Ministério da Educação de Angola</p>
          </div>
        </div>
      </div>

      <Modal
        show={showHelp}
        onClose={() => setShowHelp(false)}
        title="Recuperar Palavra-passe"
        footer={
          <button className="btn btn-primary" onClick={() => setShowHelp(false)}>Entendi</button>
        }
      >
        <div className="alert alert-info mb-3">
          <strong>Nota:</strong> Esta é uma versão de demonstração. Para recuperar a sua palavra-passe, contacte a administração da escola.
        </div>
        <p className="mb-0 text-muted small">
          Em caso de dificuldades de acesso, dirija-se à secretaria da instituição de ensino com o seu documento de identificação.
        </p>
        <hr />
        <h6>Exemplos de utilizadores (demo)</h6>
        <ul className="small">
          <li><strong>Coordenador</strong>: utilizador <code>admin</code> / palavra-passe <code>admin123</code></li>
          <li><strong>Professor</strong>: utilizador <code>prof1</code> / palavra-passe <code>prof123</code></li>
          <li><strong>Aluno</strong>: utilizador <code>aluno1</code> / palavra-passe <code>aluno123</code></li>
        </ul>
      </Modal>
    </>
  );
}
