import { motion } from 'framer-motion';

export default function WebAnimation() {
  const phpCode = [
    '<?php',
    '',
    'namespace App\\Controllers;',
    '',
    'use App\\Models\\User;',
    'use App\\Services\\AuthService;',
    '',
    'class AuthController extends BaseController',
    '{',
    '    private $authService;',
    '',
    '    public function __construct(AuthService $authService)',
    '    {',
    '        $this->authService = $authService;',
    '    }',
    '',
    '    public function login(Request $request)',
    '    {',
    '        $credentials = $request->validate([',
    '            "email" => "required|email",',
    '            "password" => "required|min:8"',
    '        ]);',
    '',
    '        if ($token = $this->authService->attempt($credentials)) {',
    '            return response()->json([',
    '                "status" => "success",',
    '                "token" => $token',
    '            ]);',
    '        }',
    '',
    '        return response()->json([',
    '            "status" => "error",',
    '            "message" => "Invalid credentials"',
    '        ], 401);',
    '    }',
    '}'
  ];

  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden bg-[#1E1E1E] font-mono text-sm md:text-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Editor Header */}
      <div className="bg-[#2D2D2D] p-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-gray-400">AuthController.php</span>
      </div>

      {/* Code Content */}
      <div className="p-6">
        {phpCode.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex"
          >
            <span className="text-gray-500 mr-4 select-none">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <span className={
              line.startsWith('<?php') ? 'text-[#569CD6]' :
              line.startsWith('namespace') ? 'text-[#C586C0]' :
              line.startsWith('use') ? 'text-[#C586C0]' :
              line.includes('class') ? 'text-[#4EC9B0]' :
              line.includes('function') ? 'text-[#DCDCAA]' :
              line.includes('$') ? 'text-[#9CDCFE]' :
              line.includes('"') ? 'text-[#CE9178]' :
              'text-[#D4D4D4]'
            }>
              {line}
            </span>
          </motion.div>
        ))}

        {/* Blinking Cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-5 bg-white/50 mt-2 ml-8"
        />
      </div>
    </motion.div>
  );
}