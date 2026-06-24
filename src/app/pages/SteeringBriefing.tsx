import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function SteeringBriefing() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/direcionamento', { replace: true });
  }, [navigate]);
  return null;
}
