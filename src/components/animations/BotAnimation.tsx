import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BrowserStep } from '@/types';
import * as Icons from 'lucide-react';
import BrowserHeader from './BrowserHeader';
import StatusBar from './StatusBar';

export default function BotAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  const browserSteps: BrowserStep[] = [
    { action: 'Opening Facebook', field: null },
    { action: 'Clicking Sign Up', field: null },
    { action: 'Filling First Name', field: 'firstName' },
    { action: 'Filling Last Name', field: 'lastName' },
    { action: 'Entering Email', field: 'email' },
    { action: 'Creating Password', field: 'password' },
    { action: 'Selecting Birthday', field: 'birthday' },
    { action: 'Choosing Gender', field: 'gender' },
    { action: 'Submitting Form', field: null },
    { action: 'Verifying Account', field: null },
  ];

  useEffect(() => {
    const animateSequence = async () => {
      for (let i = 0; i < browserSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };
    animateSequence();
  }, []);

  return (
    <div className="relative h-[600px] bg-[#1E1E1E] rounded-lg overflow-hidden">
      <div className="h-full flex flex-col">
        <BrowserHeader url="facebook.com/signup" icon="Lock" />

        <div className="flex-1 p-6 relative">
          <motion.div 
            className="absolute inset-0 bg-white/5 rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-md mx-auto mt-8 p-6">
              <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Icons.Facebook className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Create a New Account</h2>
                <p className="text-gray-400">It's quick and easy.</p>
              </motion.div>

              <div className="space-y-4">
                {browserSteps.map((step, index) => {
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;

                  return (
                    <motion.div
                      key={step.action}
                      className={`p-3 rounded-lg border ${
                        isActive ? 'border-blue-500 bg-blue-500/10' :
                        isCompleted ? 'border-green-500/50 bg-green-500/5' :
                        'border-gray-700 bg-black/20'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <Icons.CheckCircle className="w-5 h-5 text-green-500" />
                        ) : isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Icons.Loader2 className="w-5 h-5 text-blue-500" />
                          </motion.div>
                        ) : (
                          <Icons.Circle className="w-5 h-5 text-gray-500" />
                        )}
                        <span className={`text-sm ${
                          isActive ? 'text-blue-400' :
                          isCompleted ? 'text-green-400' :
                          'text-gray-400'
                        }`}>
                          {step.action}
                        </span>
                      </div>

                      {isActive && step.field && (
                        <motion.div
                          className="mt-2 pl-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="h-1 bg-blue-500/30 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5 }}
                          >
                            <motion.div
                              className="h-full bg-blue-500"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5 }}
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <StatusBar 
          status="Active"
          metrics={[
            { icon: 'Cpu', value: 'CPU: 32%', color: 'green' },
            { icon: 'Memory', value: 'Memory: 256MB', color: 'yellow' }
          ]}
        />
      </div>
    </div>
  );
}