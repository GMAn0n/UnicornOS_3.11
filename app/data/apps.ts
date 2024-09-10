import UnicornJailbreak from '../components/UnicornJailbreak';

type App = {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
};

const apps: App[] = [
  // ... existing apps ...
  {
    id: 'unicorn-jailbreak',
    title: 'Unicorn Jailbreak',
    icon: '🦄',
    component: UnicornJailbreak,
  },
];

export default apps;