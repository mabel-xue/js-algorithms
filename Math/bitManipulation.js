/** 获取 number 二进制的第 bitPosition 位 */
function getBit(number, bitPosition) {
  return (number >> bitPosition) & 1;
}

/** 将 number 二进制的第 bitPosition 位设置为 1 */
function setBit(number, bitPosition) {
  return number | (1 << bitPosition);
}

/** 将 number 二进制的第 bitPosition 位设置为 0 */
function clearBit(number, bitPosition) {
  return number & ~(1 << bitPosition);
}

/** setBit 和 clearBit 的融合 */
function updateBit(number, bitPosition, bitValue) {
  const bitValueNormalized = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

/**
 * 是否为偶数 
 * @param {number} number 
 * 基于: 最右位为 0 是偶数，为 1 是奇数
 */
function isEven(number) {
  return (number & 1) === 0;
}

/**
 * 是否为正数(以 32位 系统为例)
 * @param {number} number 
 */
function isPositive(number) {
  if (number === 0) {
    return false;
  }

  return ((number >> 31) & 1) === 0;
}

function multiplyByTwo(number) {
  return number << 1;
}

function divideByTwo(number) {
  return number >> 1;
}

function switchSign(number) {
  return ~number + 1;
}

/**
 * 带符号的两数相乘, 四种处理情况：
 *  - a 为 0 或 b 为 0
 *  - b 为偶数
 *  - b 为正奇数
 *  - b 为负奇数
 * @param {number} a 
 * @param {number} b 
 */
function multiply(a, b) {
  if (b === 0 || a === 0) {
    return 0;
  }
  const multiplyByOddPositive = () => multiply(multiplyByTwo(a), divideByTwo(b - 1)) + a;
  const multiplyByOddNegative = () => multiply(multiplyByTwo(a), divideByTwo(b + 1)) - a;
  const multiplyByEven = () => multiply(multiplyByTwo(a), divideByTwo(b));
  const multiplyByOdd = () => (isPositive(b) ? multiplyByOddPositive() : multiplyByOddNegative());
  return isEven(b) ? multiplyByEven() : multiplyByOdd();
}

/**
 * 两正数相乘, 解决该方法的核心是任意一个数都可拆分为 2 的指数幂之和
 * 例如：`19 = 2^4 + 2^1 + 2^0`; 
 * 那么`x`乘以`19`就是：`x * 19 = x * 2^4 + x * 2^1 + x * 2^0`,也就是`x << 4`
 * @param {*} number1 
 * @param {*} number2 
 */
function multiplyUnsigned(number1, number2) {
  let result = 0;
  let multiplier = number2;
  let bitIndex = 0;

  while (multiplier !== 0) {
    if (multiplier & 1) {
      result += (number1 << bitIndex);
    }
    bitIndex += 1;
    multixwplier >>= 1;
  }

  return result;
}

/** 计算二进制为 1 的位数 */
function countSetBits(originalNumber) {
  let setBitsCount = 0;
  let number = originalNumber;

  while (number) {
    setBitsCount += number & 1;
    number >>= 1;
  }

  return setBitsCount;
}

/** 计算 numberA 和 numberB 位数为 1 之差 */
function bitsDiff(numberA, numberB) {
  return countSetBits(numberA ^ numberB);
}

function bitLength(number) {
  let bitsCounter = 0;

  while ((1 << bitsCounter) <= number) {
    bitsCounter += 1;
  }

  return bitsCounter;
}

/** 是否为 2 的指数幂 */
function isPowerOfTwo(number) {
  return (number & (number - 1)) === 0;
}

/** 两数之和 */
function fullAdder(a, b) {
  let result = 0;
  let carry = 0;

  for (let i = 0; i < 32; i += 1) {
    const ai = getBit(a, i);
    const bi = getBit(b, i);
    const carryIn = carry;
    const aiPlusBi = ai ^ bi;
    const bitSum = aiPlusBi ^ carryIn;
    const carryOut = (aiPlusBi & carryIn) | (ai & bi);
    carry = carryOut;
    result |= bitSum << i;
  }

  return result;
}

// 示例
console.log(getBit(5, 0)); // 1
console.log(getBit(5, 1)); // 0
console.log(getBit(5, 2)); // 1
console.log(getBit(5, 3)); // 0

console.log(setBit(5, 1)); // 7
console.log(setBit(5, 2)); // 5

console.log(clearBit(5, 0)); // 4
console.log(clearBit(5, 1)); // 5
console.log(clearBit(5, 2)); // 1

console.log(updateBit(5, 1, 1)); // 7

console.log(multiply(2, 3)); // 6
console.log(multiply(2, -3)); // -6

console.log(multiplyUnsigned(2, 3)); // 6

console.log(countSetBits(5)); // 2
console.log(countSetBits(7)); // 3
console.log(countSetBits(8)); // 1

console.log(bitsDiff(5, 4)); // 1
console.log(bitsDiff(4, 7)); // 2

console.log(bitLength(5)); // 3
console.log(bitLength(3)); // 2

console.log(isPowerOfTwo(5)); // false
console.log(isPowerOfTwo(8)); // true

console.log(fullAdder(7, 3)); // 10
