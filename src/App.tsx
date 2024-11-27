import { ThemeProvider } from '@/components/theme-provider';
import { ServiceType } from '@/types';
import Home from '@/components/Home';
import ServiceView from '@/components/ServiceView';
import SystemLoadingScreen from '@/components/SystemLoadingScreen';
import BackgroundCode from '@/components/BackgroundCode';
import { useState } from 'react';

function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isLoading ? (
        <SystemLoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="fixed inset-0 bg-[#0A0A0A] text-foreground overflow-auto">
          <BackgroundCode />
          {selectedService ? (
            <ServiceView 
              service={selectedService} 
              onBack={() => setSelectedService(null)}
            />
          ) : (
            <Home onServiceSelect={setSelectedService} />
          )}
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;