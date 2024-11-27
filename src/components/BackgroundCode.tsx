import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BackgroundCode() {
  const [currentLine, setCurrentLine] = useState(0);

  const code = [
    'import { createQuantumCircuit, initializeQubits } from "@quantum/core";',
    'import { superposition, entangle, measure } from "@quantum/gates";',
    '',
    'interface QuantumState {',
    '  qubits: number;',
    '  amplitude: Complex;',
    '  phase: number;',
    '  entangled: boolean;',
    '}',
    '',
    'class QuantumComputer implements IQuantumProcessor {',
    '  private static instance: QuantumComputer;',
    '  private circuit: QuantumCircuit;',
    '  private states: Map<number, QuantumState>;',
    '',
    '  private constructor() {',
    '    this.circuit = createQuantumCircuit(1024);',
    '    this.states = new Map();',
    '    this.initialize();',
    '  }',
    '',
    '  public static getInstance(): QuantumComputer {',
    '    if (!QuantumComputer.instance) {',
    '      QuantumComputer.instance = new QuantumComputer();',
    '    }',
    '    return QuantumComputer.instance;',
    '  }',
    '',
    '  private async initialize(): Promise<void> {',
    '    const qubits = await initializeQubits({',
    '      count: 1024,',
    '      temperature: 0.01,  // milliKelvin',
    '      coherenceTime: 100, // microseconds',
    '      fidelity: 0.9999',
    '    });',
    '',
    '    for (const qubit of qubits) {',
    '      await this.prepareQubit(qubit);',
    '    }',
    '  }',
    '',
    '  private async prepareQubit(qubit: Qubit): Promise<void> {',
    '    await superposition(qubit);',
    '    const state = await measure(qubit);',
    '',
    '    if (state.amplitude.magnitude > 0.5) {',
    '      await this.entangle(qubit, this.findEntanglementPartner());',
    '    }',
    '  }',
    '',
    '  public async execute(algorithm: QuantumAlgorithm): Promise<Result> {',
    '    const startTime = process.hrtime.bigint();',
    '',
    '    try {',
    '      await this.validateAlgorithm(algorithm);',
    '      const initialState = this.prepareInitialState(algorithm.requirements);',
    '',
    '      const result = await this.circuit.execute(algorithm, {',
    '        state: initialState,',
    '        optimization: "maximum",',
    '        errorCorrection: true,',
    '        maxGates: 1000000',
    '      });',
    '',
    '      return {',
    '        data: result,',
    '        executionTime: process.hrtime.bigint() - startTime,',
    '        qubitCount: this.circuit.activeQubits,',
    '        gateCount: result.statistics.gatesUsed,',
    '        fidelity: result.statistics.fidelity',
    '      };',
    '',
    '    } catch (error) {',
    '      await this.handleQuantumError(error);',
    '      throw new QuantumExecutionError(error);',
    '    }',
    '  }',
    '',
    '  private async handleQuantumError(error: Error): Promise<void> {',
    '    await this.circuit.reset();',
    '    await this.reinitializeErroredQubits();',
    '    this.logErrorToQuantumMonitor(error);',
    '  }',
    '}',
    '',
    'export class QuantumAlgorithmFactory {',
    '  public static createShorsAlgorithm(number: bigint): QuantumAlgorithm {',
    '    return {',
    '      type: "FACTORIZATION",',
    '      requirements: {',
    '        qubits: Math.ceil(Math.log2(Number(number))) * 2,',
    '        coherenceTime: 1000,',
    '        errorRate: 0.0001',
    '      },',
    '      circuit: (qubits) => {',
    '        const register = qubits.slice(0, qubits.length / 2);',
    '        const auxiliary = qubits.slice(qubits.length / 2);',
    '',
    '        return [',
    '          ...this.applyQuantumFourierTransform(register),',
    '          ...this.applyControlledUOperations(register, auxiliary, number),',
    '          ...this.applyInverseQFT(register)',
    '        ];',
    '      }',
    '    };',
    '  }',
    '}',
    '',
    'const quantum = QuantumComputer.getInstance();',
    'const algorithm = QuantumAlgorithmFactory.createShorsAlgorithm(2n ** 512n - 1n);',
    'const result = await quantum.execute(algorithm);',
    'console.log(`Found factors: ${result.data.factors.join(", ")}`);'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % code.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none -z-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative h-full overflow-hidden font-mono text-sm">
        <div className="absolute inset-0 flex">
          <div className="flex-1 p-8 opacity-20">
            {code.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentLine ? 1 : 0,
                  x: index <= currentLine ? 0 : -20 
                }}
                transition={{ duration: 0.1 }}
                className="whitespace-pre"
              >
                <span className="text-gray-500 mr-4 select-none">
                  {(index + 1).toString().padStart(3, '0')}
                </span>
                <span className={
                  line.includes('class') ? 'text-purple-400' :
                  line.includes('interface') ? 'text-blue-400' :
                  line.includes('private') || line.includes('public') ? 'text-blue-300' :
                  line.includes('async') ? 'text-yellow-300' :
                  line.includes('import') ? 'text-green-300' :
                  line.includes('await') ? 'text-purple-300' :
                  line.includes('try') || line.includes('catch') ? 'text-red-300' :
                  line.includes('"') ? 'text-orange-300' :
                  line.includes('number') || line.includes('boolean') ? 'text-blue-200' :
                  'text-gray-300'
                }>
                  {line}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}