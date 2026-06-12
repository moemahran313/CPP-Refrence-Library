export const NUMBER_SYSTEMS_GUIDE = {
  title: "Numbering Systems Master Guide",
  subtitle: "Fast exam shortcuts, mental tricks, and the most reliable conversion techniques.",
  description: "Learn how to convert between bases (Binary, Decimal, Octal, Hexadecimal) quickly without a calculator natively. This guide is specifically optimized for exam scenarios focusing strictly on positional understanding and shortcuts.",
  coreConcepts: [
    {
      title: "Radix / Base",
      content: "The radix (or Base) dictates how many unique digits exist in a numbering system. Decimal (Base 10) uses 0-9. Binary (Base 2) uses 0-1. Hexadecimal (Base 16) uses 0-9 then A-F."
    },
    {
      title: "Positional Notation & Place Values",
      content: "The fundamental rule of all numbering systems. Every digit's value is multiplied by the Base raised to the power of its position (starting from 0 on the far right).\nExample for Binary (101):\n$1 \\times 2^2 = 4$\n$0 \\times 2^1 = 0$\n$1 \\times 2^0 = 1$\nSum = $5$ in Decimal."
    }
  ],
  memorizationTables: {
    powersOfTwo: [
      { exp: "2⁰", val: 1 }, { exp: "2¹", val: 2 }, { exp: "2²", val: 4 }, { exp: "2³", val: 8 },
      { exp: "2⁴", val: 16 }, { exp: "2⁵", val: 32 }, { exp: "2⁶", val: 64 }, { exp: "2⁷", val: 128 },
      { exp: "2⁸", val: 256 }, { exp: "2⁹", val: 512 }, { exp: "2¹⁰", val: 1024 }
    ],
    hexMapping: [
      { hex: "A", dec: 10, bin: "1010" },
      { hex: "B", dec: 11, bin: "1011" },
      { hex: "C", dec: 12, bin: "1100" },
      { hex: "D", dec: 13, bin: "1101" },
      { hex: "E", dec: 14, bin: "1110" },
      { hex: "F", dec: 15, bin: "1111" }
    ],
    octalMapping: [
      { oct: "0", bin: "000" }, { oct: "1", bin: "001" }, { oct: "2", bin: "010" }, { oct: "3", bin: "011" },
      { oct: "4", bin: "100" }, { oct: "5", bin: "101" }, { oct: "6", bin: "110" }, { oct: "7", bin: "111" }
    ]
  },
  methods: [
    {
      id: "bin-to-dec",
      title: "Binary to Decimal",
      from: "Binary",
      to: "Decimal",
      standard: "Positional Weights: Multiply each bit by 2^position and sum.",
      fastest: "Mental Power-of-Two Stack: Look at bits strictly right-to-left, thinking '1, 2, 4, 8, 16...'. Add the number only if the bit is '1'. Ignore '0's completely.",
      example: "Convert $10110_2$ to Decimal:\nValues are $16, 8, 4, 2, 1$.\nBits: $1\\_0\\_1\\_1\\_0$\nCalculation: $16 + 0 + 4 + 2 + 0 = 22_{10}$",
      mistakes: "Forgetting that the right-most bit is 2⁰ (which is 1), not 2¹. Start counting position from 0!"
    },
    {
      id: "dec-to-bin",
      title: "Decimal to Binary",
      from: "Decimal",
      to: "Binary",
      standard: "Repeated Division by 2: Divide number by 2, record remainder. Divide quotient by 2 again. Read remainders bottom-up.",
      fastest: "Subtract Largest Power-of-Two: Find largest power of 2 that fits, subtract it, log a '1'. Repeat for remainder. Log '0' for skipped powers.",
      example: "Convert $45_{10}$ to Binary\nLargest power is $32$ ($32$ fits $45$). Remainder = $13$.\n(Bit 32 is $1$)\n$16$ does not fit $13$.\n(Bit 16 is $0$)\n$8$ fits $13$. Remainder = $5$.\n(Bit 8 is $1$)\n$4$ fits $5$. Remainder = $1$.\n(Bit 4 is $1$)\n$2$ does not fit.\n(Bit 2 is $0$)\n$1$ fits $1$. Remainder = $0$.\nResult: $101101_2$",
      mistakes: "In division method, forgetting to read remainders from bottom to top yielding the reversed answer."
    },
    {
      id: "bin-to-oct",
      title: "Binary to Octal",
      from: "Binary",
      to: "Octal",
      standard: "Convert Binary -> Decimal -> Octal.",
      fastest: "Grouping by 3: Since 8 = 2³, exactly 3 bits map to 1 Octal digit. Parse right-to-left in chunks of 3. Pad left with 0s if needed.",
      example: "Convert $1011011_2$ to Octal.\nGroup by 3: $001$ | $011$ | $011$ (padded left).\nTranslate chunks mentally: $1$ | $3$ | $3$\nResult: $133_8$",
      mistakes: "Grouping left-to-right instead of right-to-left!"
    },
    {
      id: "bin-to-hex",
      title: "Binary to Hexadecimal",
      from: "Binary",
      to: "Hex",
      standard: "Convert Binary -> Decimal -> Hex.",
      fastest: "Grouping by 4 (Nibbles): Since 16 = 2⁴, exactly 4 bits map to 1 Hex digit. Parse right-to-left in chunks of 4.",
      example: "Convert $11010111_2$ to Hex.\nGroup: $1101$ | $0111$\nConvert parts directly: $1101$ is $13$ ($D$), $0111$ is $7$.\nResult: $D7_{16}$",
      mistakes: "Misremembering A-F equivalents (A=10, F=15)."
    },
    {
      id: "oct-to-hex",
      title: "Octal to Hexadecimal",
      from: "Octal",
      to: "Hex",
      standard: "Octal -> Decimal -> Hex.",
      fastest: "Use Binary as a Bridge (Octal -> Binary -> Hex): Expand each octal digit into 3 bits, then re-group the total string into 4-bit chunks.",
      example: "Convert $35_8$ to Hex.\nWait! Expand $35$ into bits:\n$3 \\rightarrow 011$\n$5 \\rightarrow 101$\nBits: $011101$\nRegroup by 4: $0001$ | $1101$\nResult: $1D_{16}$",
      mistakes: "Trying to do direct math. Always bridge through binary organically!"
    },
    {
      id: "any-to-dec",
      title: "Any Base to Decimal",
      from: "Base-X",
      to: "Decimal",
      standard: "Universal Positional Expansion. Expand using positional powers of the source Base.",
      fastest: "Standard positional expansion is fundamentally the fastest.",
      example: "Convert $143_5$ to Decimal.\n$1 \\times 5^2 + 4 \\times 5^1 + 3 \\times 5^0$\n$25 + 20 + 3 = 48_{10}$",
      mistakes: "Using base 10 multipliers by accident."
    }
  ],
  strategyDecisionMap: [
    { from: "Any Base", to: "Decimal", act: "Positional Expansion" },
    { from: "Decimal", to: "Any Base", act: "Repeated Division" },
    { from: "Binary", to: "Octal or Hex", act: "Group by 3 or 4" },
    { from: "Octal or Hex", to: "Binary", act: "Direct Expand (3 or 4 bits)" },
    { from: "Octal", to: "Hex", act: "Via Binary Bridge (Group 3 -> Group 4)" }
  ]
};
