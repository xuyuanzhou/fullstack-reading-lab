/* Java 117: Java 基础第一遍，类型。定义课，不单开为什么。 */
const COVERAGE_JAVA_117 = [
  {
    track:'java', group:'Java 基础', id:'java-eight-primitives',
    title:'八种基本类型存的是值，整数相除会丢掉小数',
    prompt:'5 / 2 为什么得到 2，而不是 2.5？',
    promptAnswer:'基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。',
    core:'语言规范里的基本类型（primitive type）一共八种。整数是 byte、short、int、long，浮点是 float、double，另外还有 char 和 boolean。变量里放的是值本身。整数字面量默认是 int，末尾加 L 才是 long。小数字面量默认是 double，末尾加 F 才是 float。两个整数相除按整数除法（integer division），商向零截断：5 / 2 是 2，(-5) / 2 是 -2。要留下小数，至少有一边是浮点，例如 5.0 / 2。',
    example:'整数相除丢掉小数：\n\n```java\nint q = 5 / 2;          // 2\nint nq = (-5) / 2;      // -2，向零截断\ndouble d = 5.0 / 2;     // 2.5\nlong n = 5L;\nboolean ok = true;\n```',
    task:'写出八种基本类型。预测 7 / 2 和 7.0 / 2 各是什么。',
    answer:'八种是 byte、short、int、long、float、double、char、boolean。7 / 2 是 3，因为两边都是 int，小数被丢掉。7.0 / 2 是 3.5，因为有一边是浮点。(-7) / 2 是 -3，向零截断，不是向下取到 -4。',
    keywords:'Java primitive type integer division byte int long char boolean',
    points:['八种基本类型直接存值','整数字面量默认 int，小数字面量默认 double','整数除法向零截断'],
    deep:[
      {title:'和导论',body:'Java 是什么、怎样从 main 启动、和 JavaScript 的边界见 java-what-it-is、java-enter-main、java-not-javascript。本课专讲八种基本类型。'},
      {title:'char 和 boolean',body:'char 存一个 UTF-16 码元，范围是 0 到 65535，不是一段完整的文字。boolean 只有 true 和 false，不能当成 0 和 1 去运算。'},
      {title:'怎样自己验证',body:'写 int q = 5 / 2 和 double d = 5.0 / 2，打印两个结果。再写 (-5) / 2，确认是 -2。'},
    ],
    refs:[['JLS：Primitive Types and Values','https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.2'],['JLS：Division Operator','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17.2']]
  },
  {
    track:'java', group:'Java 基础', id:'java-reference-and-null',
    title:'引用类型存的是指向对象的引用，null 表示没有指向',
    prompt:'String s = null 之后，为什么 s.length() 会失败？',
    promptAnswer:'s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。',
    core:'类、接口和数组都是引用类型（reference type）。变量里放的是指向对象的引用，对象在别处。null 是空引用（null literal），表示当前没有指向任何对象。对 null 调用方法或读字段，抛出 NullPointerException。基本类型的变量不能赋 null。两个引用变量可以指向同一个对象，方法参数复制的也是引用，见 `java-pass-by-value`。',
    example:'null 上面没有对象：\n\n```java\nString s = null;\n// s.length() 抛出 NullPointerException\nString a = "CNY";\nString b = a;          // a 和 b 指向同一个对象\n```',
    task:'说明引用变量里放的是什么。写出对 null 调用方法时抛出的异常名。',
    answer:'引用变量里放的是指向对象的引用。null 表示没有指向。对 null 调用方法抛出 NullPointerException。int 这种基本类型不能赋 null。把一个 String 赋给另一个变量，两个变量指向同一个对象。',
    keywords:'Java reference type null NullPointerException',
    points:['引用变量放的是指向对象的引用','null 表示当前没有指向对象','对 null 调用方法抛出 NullPointerException'],
    deep:[
      {title:'两个变量可以是同一个对象',body:'把 a 赋给 b 之后，改的是对象上的内容时，两个变量都看得到。把其中一个改成指向别的对象，另一个仍指向原来的对象。'},
      {title:'怎样自己验证',body:'把 String s 设为 null，调用 length()，确认异常名是 NullPointerException。再把一个字符串赋给两个变量，比较它们是否指向同一处。'},
    ],
    refs:[['JLS：Reference Types and Values','https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.3'],['JLS：The Null Literal','https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.8']]
  },
  {
    track:'java', group:'Java 基础', id:'java-field-default-var',
    title:'字段有默认值，局部变量没有；var 是推断出来的类型',
    prompt:'为什么字段不赋值就能读，方法里的 int n 不赋值却编不过？',
    promptAnswer:'字段和数组元素有默认值。局部变量必须先赋值。var 只表示让编译器推断这个局部变量的类型。',
    core:'实例字段和数组元素有默认值（default value）：数值是 0，boolean 是 false，引用是 null。方法里的局部变量没有默认值，读之前必须赋值，否则编译失败。var 是局部变量类型推断（local-variable type inference，JDK 10），不是一种新的类型。var count = 1 里的 count 仍是 int。右边必须有初始值，编译器才推得出类型。字段、参数和方法返回值不能写 var。',
    example:'局部变量要先赋值，var 仍是原来的类型：\n\n```java\nint unset;\n// 还不能读 unset\nunset = 1;\nvar count = 1;         // count 的类型是 int\n```',
    task:'列出数值字段、boolean 字段和引用字段的默认值。说明 var count = 1 的类型是什么。',
    answer:'数值字段默认 0，boolean 默认 false，引用默认 null。局部变量没有这些默认值，读之前必须赋值。var count = 1 的类型是 int，var 本身不是类型。字段上不能写 var。',
    keywords:'Java default value local variable var JEP 286',
    points:['字段和数组元素有默认值','局部变量读之前必须赋值','var 是局部变量的类型推断，不是新类型'],
    deep:[
      {title:'推不出类型就不能写 var',body:'var n; 没有右边的值，编译器不知道 n 是哪种类型。var 也不能出现在字段、参数和返回类型上。'},
      {title:'怎样自己验证',body:'声明一个不赋值的 int 字段和一个不赋值的局部 int，确认只有局部变量在读取时编译失败。再写 var count = 1，看它能否传给需要 int 的方法。'},
    ],
    refs:[['JLS：Initial Values of Variables','https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12.5'],['JEP 286：Local-Variable Type Inference','https://openjdk.org/jeps/286']]
  },
  {
    track:'java', group:'Java 基础', id:'java-widening-cast',
    title:'加宽可以自动转换，变窄必须写强制转换',
    prompt:'为什么 int 能直接赋给 long，long 赋给 int 却要写 (int)？',
    promptAnswer:'加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。装箱是另一件事。',
    core:'基本类型之间，加宽（widening primitive conversion）是规范允许自动发生的转换，例如 int 赋给 long、float 赋给 double。变窄（narrowing primitive conversion）必须写强制转换（cast），例如 long 转到 int、double 转到 int。强制转换会丢掉放不下的部分：(int) 3.9 得到 3。int 转到 float 虽然算加宽，很大的整数也可能不再精确。装箱（boxing）是把基本类型放进包装类，见 `java-autoboxing-cache`。',
    example:'变窄要自己写转换：\n\n```java\nlong wide = 5;            // int 加宽成 long\nint narrow = (int) wide;  // 变窄必须写强制转换\nint cut = (int) 3.9;      // 3\n```',
    task:'说明 int 赋给 long、long 赋给 int 各自要不要写强制转换。预测 (int) 3.9 的结果。',
    answer:'int 赋给 long 是加宽，自动完成。long 赋给 int 是变窄，必须写 (int)。(int) 3.9 得到 3，小数被丢掉。装箱见 `java-autoboxing-cache`，不是这种转换。',
    keywords:'Java widening narrowing cast primitive conversion',
    points:['加宽转换可以自动发生','变窄必须写强制转换','装箱是包装类，不是加宽或变窄'],
    deep:[
      {title:'加宽也不保证每一位都还在',body:'int 到 long 能装下原来的整数。int 到 float 按规范算加宽，但 float 的精度不够时，很大的整数会变成近似值。'},
      {title:'怎样自己验证',body:'把 int 赋给 long，确认不用强制转换。把 long 赋给 int，确认不写 (int) 就编不过。打印 (int) 3.9，结果应为 3。'},
    ],
    refs:[['JLS：Widening Primitive Conversion','https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.2'],['JLS：Narrowing Primitive Conversion','https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.3']]
  },
  {
    track:'java', group:'Java 基础', id:'java-wrapper-type',
    title:'包装类把基本类型包成对象',
    prompt:'已经有 int，为什么还要 Integer？',
    promptAnswer:'List 和泛型要的是对象。Integer 是 int 的包装类。两个 Integer 是否同一个对象，见整数缓存那一课。',
    core:'八种基本类型各有一个包装类（wrapper class）：Byte、Short、Integer、Long、Float、Double、Character、Boolean。包装类是对象，可以放进 List，也可以是 null。int 不能为 null，也不能当作 List 的元素类型。把 int 变成 Integer 叫装箱（boxing），见 `java-autoboxing-cache`。比较两个 Integer 是否指向同一个对象，和比较它们里面的数值，是两件事。',
    example:'集合里放的是包装类：\n\n```java\nint n = 1;\nInteger boxed = n;                 // 装箱\nList<Integer> nums = new ArrayList<>();\nnums.add(boxed);\n```',
    task:'列出 int 和 boolean 对应的包装类。说明为什么 List 的元素类型写成 Integer，不写成 int。',
    answer:'int 的包装类是 Integer，boolean 的包装类是 Boolean。List 只能放对象，元素类型要写 Integer。int 不是对象，也不能表示 null。装箱和整数缓存见 `java-autoboxing-cache`。',
    keywords:'Java wrapper class Integer boxing',
    points:['每种基本类型有一个包装类','包装类是对象，可以为 null','List 的元素类型用包装类'],
    deep:[
      {title:'数值相等和对象相同',body:'equals 比的是包装里的数值。== 比的是不是同一个对象。哪些数值会共用同一个对象，见 `java-autoboxing-cache`。'},
      {title:'怎样自己验证',body:'声明 List<Integer>，放入一个 int。再声明一个 Integer 并赋 null，确认基本类型的 int 不能同样赋 null。'},
    ],
    refs:[['Integer','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html'],['JLS：Boxing Conversion','https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.7']]
  },
  {
    track:'java', group:'Java 基础', id:'java-array-length',
    title:'数组的长度在创建时定下，下标从 0 开始',
    prompt:'new int[3] 之后，为什么不能再把长度改成 4？',
    promptAnswer:'长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。',
    core:'数组（array）是对象，按顺序存放同一类型的元素。这个元素类型规范叫 component type。new int[3] 得到长度 3 的数组，三个元素都是默认值 0。长度放在 length 字段里，创建之后不能改。下标从 0 开始，最后一个是 length - 1。越界抛出 ArrayIndexOutOfBoundsException。new String[2] 的两个元素都是 null。要随时增删元素，用 List，见 `java-list-set-map`。',
    example:'长度创建后不变：\n\n```java\nint[] a = new int[3];\na[0] = 10;\n// a.length 是 3\n// a[3] 抛出 ArrayIndexOutOfBoundsException\n```',
    task:'写出 new int[3] 的长度、默认元素和合法下标。说明 length 能不能改。',
    answer:'长度是 3，三个元素默认是 0，合法下标是 0、1、2。length 在创建时定下，不能改。下标 3 抛出 ArrayIndexOutOfBoundsException。元素类型规范叫 component type，这个数组的 component type 是 int。',
    keywords:'Java array length component type index',
    points:['数组长度在 new 时定下','下标从 0 到 length - 1','越界抛出 ArrayIndexOutOfBoundsException'],
    deep:[
      {title:'length 是字段',body:'数组用 a.length，后面没有括号。String 才用 length()。引用数组刚创建时，元素是 null，不是空字符串。'},
      {title:'怎样自己验证',body:'创建 new int[3]，打印 length，给下标 0 赋值。再访问下标 3，确认异常名是 ArrayIndexOutOfBoundsException。'},
    ],
    refs:[['JLS：Arrays','https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html#jls-10.1'],['JLS：Array Access','https://docs.oracle.com/javase/specs/jls/se21/html/jls-10.html#jls-10.4']]
  },
  {
    track:'java', group:'Java 基础', id:'java-string-type',
    title:'String 是类，字面量的类型就是 String',
    prompt:'String 为什么能写 s.length()，int 却不能？',
    promptAnswer:'String 是类，变量里是指向字符串对象的引用。字面量 "CNY" 的类型就是 String。',
    core:'String 是 java.lang 里的类，不是基本类型。字符串字面量（string literal）用双引号写出，类型就是 String，例如 "CNY"。它可以调用 length() 和 charAt(int)。用 + 连接字符串，或者把字符串和数字连在一起，会得到一个新的 String："CNY" + 1 是 "CNY1"。已有字符串的内容不能改，和 new String 的差别见 `java-string-immutability`、`java-string-new-vs-pool`。',
    example:'字面量就是 String：\n\n```java\nString currency = "CNY";\nint n = currency.length();     // 3\nString label = currency + 1;   // "CNY1"\n```',
    task:'说明 "CNY" 的类型。预测 "CNY" + 1 的结果，以及它是不是原来的那个对象。',
    answer:'"CNY" 的类型是 String，是一个对象引用，不是基本类型。length() 得到 3。"CNY" + 1 得到新的字符串 "CNY1"。原来的 "CNY" 内容不变，见 `java-string-immutability`。',
    keywords:'Java String literal length concatenation',
    points:['String 是类，不是基本类型','双引号字面量的类型是 String','+ 连接得到一个新的 String'],
    deep:[
      {title:'length() 带括号',body:'String 的长度是方法 length()。数组的长度是字段 length。charAt 的下标也从 0 开始。'},
      {title:'怎样自己验证',body:'写 String currency = "CNY"，打印 length() 和 currency + 1。确认结果是 3 和 CNY1。'},
    ],
    refs:[['JLS：String Literals','https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.5'],['String','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-list-set-map',
    title:'List 按位置放元素，Set 不放重复，Map 用键找值',
    prompt:'订单行、去重后的用户号、订单号到金额，各该用哪一种？',
    promptAnswer:'要顺序、也允许重复，用 List。只要每个元素出现一次，用 Set。要用键查出值，用 Map。',
    core:'List、Set、Map 是 java.util 里的接口。List 按位置存放元素，允许重复，用 get(下标) 取出，下标从 0 开始。Set 里同一元素只放一次，是否重复由 equals 决定，见 `java-equals-contract`。Map 保存键到值，同一个键只留一个值，用 get(键) 取出。常用实现是 ArrayList、HashSet、HashMap。Set 并不因此就有序，见 `java-set-not-always-sorted`。初始容量和链表树化见 `hashmap-initial-16-not-max`、`hashmap-treeify-need-capacity`。',
    example:'三种各管一件事：\n\n```java\nList<String> lines = new ArrayList<>();\nlines.add("a");\nlines.add("a");                 // List 里有两个\nSet<String> ids = new HashSet<>();\nids.add("u1");\nids.add("u1");                  // Set 里仍是一个\nMap<String, Integer> amount = new HashMap<>();\namount.put("A001", 100);\n```',
    task:'订单行、不重复的用户号、订单号到金额，分别写出用 List、Set 还是 Map。',
    answer:'订单行用 List，因为要按位置保留，也允许重复。不重复的用户号用 Set，重复由 equals 决定。订单号到金额用 Map，用订单号当键取出金额。HashSet 不保证排序，见 `java-set-not-always-sorted`。',
    keywords:'Java List Set Map ArrayList HashMap',
    points:['List 按位置存放，允许重复','Set 按 equals 去掉重复','Map 用键取出对应的值'],
    deep:[
      {title:'尖括号里是元素或键值的类型',body:'List<String> 表示元素按 String 检查。Map<String, Integer> 表示键是 String、值是 Integer。右边的 <> 见 `java-generic-diamond`。'},
      {title:'怎样自己验证',body:'对同一个字符串 add 两次：List 的 size 增加 2，HashSet 的 size 仍是 1。再 put 同一个键两次，确认 Map 里这个键只留下后一个值。'},
    ],
    refs:[['List','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html'],['Set','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html'],['Map','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_117) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
