/* Java 118: Java 基础第一遍，语法。定义课，不单开为什么。 */
const COVERAGE_JAVA_118 = [
  {
    track:'java', group:'Java 基础', id:'java-operator-result',
    title:'算术得到数，比较和逻辑得到 boolean',
    prompt:'为什么 n == 0 的结果不能赋给 int？',
    promptAnswer:'== 比较是否相等，结果是 boolean。算术运算的结果才是数。',
    core:'算术运算符 + - * / % 算出一个数。两个 int 相除仍是 int，见 `java-eight-primitives`。比较运算符 == != < > <= >= 的结果是 boolean，不是 0 或 1。逻辑运算符 && || ! 只接受 boolean，结果也是 boolean。一个等号 = 是赋值，把右边的值放进左边的变量。== 比较基本类型的值；比较对象的内容用 equals，见 `java-equals-contract`。',
    example:'比较的结果是 boolean：\n\n```java\nint n = 5;\nboolean zero = (n == 0);   // false\nint q = n / 2;            // 2\n```',
    task:'说明 n == 0 和 n = 0 各是什么运算，结果类型分别是什么。',
    answer:'n == 0 是比较，结果是 boolean。n = 0 是赋值，把 0 放进 n，表达式的类型是 n 的类型 int。两个 int 相除仍是整数除法。对象内容用 equals 比较，见 `java-equals-contract`。',
    keywords:'Java operator assignment equality boolean',
    points:['算术运算的结果是数','比较和逻辑运算的结果是 boolean','一个等号是赋值，两个等号是比较'],
    deep:[
      {title:'整数上的 & 不是逻辑与',body:'&& 和 || 只用于 boolean。整数上的 & 和 | 是按位运算，结果仍是数。'},
      {title:'怎样自己验证',body:'把 n == 0 赋给 boolean，确认可以编译。再把同一个比较赋给 int，确认编不过。'},
    ],
    refs:[['JLS：Multiplicative Operators','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17'],['JLS：Equality Operators','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.21']]
  },
  {
    track:'java', group:'Java 基础', id:'java-if-else',
    title:'if 的条件必须是 boolean，else 配最近的 if',
    prompt:'为什么 if (n = 0) 编不过？',
    promptAnswer:'if 的条件必须是 boolean。n = 0 是赋值，n 是 int，结果也是 int。比较要写 n == 0。',
    core:'if 语句的条件必须是 boolean。条件为 true 时执行紧跟着的语句或块，否则执行 else。else 和最近的、还没有 else 的 if 配在一起。要让 else 配外层的 if，就把内层 if 写成用花括号包住的块。0 不是 false，所以条件不能是 int。',
    example:'条件用比较，不用赋值：\n\n```java\nint n = 0;\nif (n == 0) {\n  n = 1;\n} else {\n  n = 2;\n}\n```',
    task:'说明 if (n = 0) 为什么编不过。写出 else 默认和哪一个 if 配对。',
    answer:'n = 0 把 0 赋给 int，表达式类型是 int。if 只要 boolean，所以编不过。比较写成 n == 0。else 和最近的、还没有 else 的 if 配对。要配外层 if，内层要用花括号包成一块。',
    keywords:'Java if else boolean dangling else',
    points:['if 的条件必须是 boolean','else 配最近的尚未配对的 if','0 不能当作 false'],
    deep:[
      {title:'花括号决定 else 属于谁',body:'内层 if 不写花括号时，后面的 else 属于内层。把内层包进花括号，else 才属于外层。'},
      {title:'怎样自己验证',body:'写 if (n = 0)，确认编译失败。改成 if (n == 0) 后通过。再写两层 if，看 else 落在内层还是外层。'},
    ],
    refs:[['JLS：The if Statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.9']]
  },
  {
    track:'java', group:'Java 基础', id:'java-switch-colon',
    title:'冒号 switch 匹配之后继续往下执行，直到 break',
    prompt:'case 1 里面没有 break，为什么 case 2 的代码也跑了？',
    promptAnswer:'冒号形式匹配之后会继续执行后面的语句，这叫落入。这一支要停住，就写 break。',
    core:'switch 用一个表达式挑选分支。冒号形式里，执行从匹配的 case 或 default 开始，并继续往后，直到 break、return，或者这个 switch 结束。这种继续叫落入（fall through）。不想继续的分支要自己写 break。选择表达式可以是整数、String 或 enum。箭头形式（->）不会落入，见 `java-switch-arrow-no-fall`。',
    example:'没有 break 就会落入下一支：\n\n```java\nint n = 1;\nint hits = 0;\nswitch (n) {\n  case 1:\n    hits = hits + 1;\n  case 2:\n    hits = hits + 1;\n    break;\n  default:\n    break;\n}\n// hits 是 2\n```',
    task:'说明冒号 switch 在 case 里不写 break 时，后面的 case 会不会执行。箭头形式见哪一课。',
    answer:'冒号形式从匹配的 case 继续往下，直到 break。case 1 不写 break，case 2 也会执行。要停在这一支就写 break。箭头形式不会落入，见 `java-switch-arrow-no-fall`。',
    keywords:'Java switch fall through break case',
    points:['冒号 switch 从匹配的 case 继续往下','break 停住这一支','箭头形式不会落入'],
    deep:[
      {title:'default 不是必须写',body:'没有匹配的 case、也没有 default 时，switch 什么都不做。default 写在哪里，落入仍从匹配点往后走，不因为名字叫 default 就最后才执行。'},
      {title:'怎样自己验证',body:'用上面的例子，n 取 1，确认 hits 变成 2。在 case 1 末尾加上 break，确认 hits 变成 1。'},
    ],
    refs:[['JLS：The switch Statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11']]
  },
  {
    track:'java', group:'Java 基础', id:'java-loop-break',
    title:'循环重复一块代码，break 离开，continue 进入下一轮',
    prompt:'写在 for 里面的 continue 和 break，分别跳到哪里？',
    promptAnswer:'continue 跳过这一轮剩下的语句，然后进入下一轮。break 离开整个循环。',
    core:'while (条件) 在条件为 true 时重复执行后面的语句。for (初始化; 条件; 更新) 先做一次初始化，之后每轮先看条件，循环体结束再做更新。条件必须是 boolean。break 离开它所在的这一层循环。continue 跳过这一轮剩下的语句：while 回到条件，for 先做更新再看条件。for (String s : lines) 按顺序取出每个元素；循环里删除元素见 `java-foreach-remove-cme`。',
    example:'continue 跳过这一轮：\n\n```java\nint sum = 0;\nfor (int i = 0; i < 3; i = i + 1) {\n  if (i == 1) continue;\n  sum = sum + i;\n}\n// sum 是 2\n```',
    task:'说明 continue 和 break 的差别。预测上面这段循环的 sum。',
    answer:'continue 只跳过这一轮剩下的语句，循环还在。break 离开整个循环。i 为 0 时加上 0，i 为 1 时跳过，i 为 2 时加上 2，sum 是 2。遍历时删除见 `java-foreach-remove-cme`。',
    keywords:'Java for while break continue',
    points:['while 和 for 在条件为 true 时重复','break 离开这一层循环','continue 跳过这一轮剩下的语句'],
    deep:[
      {title:'break 只离开一层',body:'循环里面再套循环时，break 离开的是写着它的那一层，外层还会继续。for 的更新在 continue 之后、下一次看条件之前执行。'},
      {title:'怎样自己验证',body:'跑上面的 for，打印 sum，应为 2。把 continue 改成 break，确认 i 为 1 时循环结束，sum 仍是 0。'},
    ],
    refs:[['JLS：The while Statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.12'],['JLS：The break Statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.15'],['JLS：The continue Statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.16']]
  },
  {
    track:'java', group:'Java 基础', id:'java-method-overload',
    title:'方法由名字和参数类型一起区分，返回类型不算',
    prompt:'两个都叫 add 的方法，为什么有的能同时存在，有的编不过？',
    promptAnswer:'参数个数或类型不同，就是重载，可以共存。参数一样、只改返回类型，签名相同，不能共存。',
    core:'方法声明写出名字、参数和返回类型。签名（signature）只包括名字和参数类型，不包括返回类型，也不包括参数名。同一个类里，名字相同、参数类型不同，叫重载（overload），调用时按实参的类型挑选。参数一样、只改返回类型，签名冲突，编译失败。调用时先求值再把值复制进方法，见 `java-pass-by-value`。',
    example:'参数类型不同才是两个方法：\n\n```java\nint add(int a, int b) { return a + b; }\nlong add(long a, long b) { return a + b; }\n// 再写一个 int add(int x, int y) 会和第一个签名相同\n```',
    task:'说明两个 add(int, int) 只改返回类型时为什么不能共存。参数名不同算不算另一个方法。',
    answer:'签名是名字加上参数类型。两个 add(int, int) 签名相同，只改返回类型仍然冲突。参数名不同不算另一个签名。参数类型不同才是重载，调用时按实参类型挑选。',
    keywords:'Java method signature overload',
    points:['签名是方法名加参数类型','参数类型不同可以重载','只改返回类型不能变成另一个方法'],
    deep:[
      {title:'参数名不参加签名',body:'add(int a, int b) 和 add(int x, int y) 是同一个签名。调用方看到的是两个 int，不是参数叫什么。'},
      {title:'怎样自己验证',body:'在同一个类里写 add(int, int) 和 add(long, long)，确认可以共存。再写两个参数同为 int、返回类型不同的 add，确认编译失败。'},
    ],
    refs:[['JLS：Method Signature','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.2']]
  },
  {
    track:'java', group:'Java 基础', id:'java-class-new-this',
    title:'class 声明类型，new 调用构造器，this 是当前对象',
    prompt:'new Order(10) 调用的是哪一段代码？',
    promptAnswer:'new 创建对象，并调用参数匹配的构造器。构造器里的 this 就是正在创建的这个对象。',
    core:'class 声明一种引用类型，里面可以有字段和方法。new Order(10) 创建对象，并调用参数匹配的构造器（constructor）。构造器的名字和类相同，没有返回类型。一个都没写时，编译器补一个无参构造器；只要写了任何一个，这个无参构造器就不再自动补上。构造器里的 this 指正在创建的对象，this.amount 是字段，amount 若同名则是参数。子类构造器怎样调用父类，见 `java-ctor-implicit-super-noarg`。',
    example:'new 走进参数匹配的构造器：\n\n```java\nclass Order {\n  int amount;\n  Order(int amount) { this.amount = amount; }\n}\nOrder o = new Order(10);\n```',
    task:'说明 new Order(10) 调用谁。类里只写了带参数的构造器时，new Order() 还能不能过。',
    answer:'new Order(10) 调用参数是 int 的构造器，this.amount 把 10 放进这个对象的字段。类里只要写了构造器，编译器就不再补无参构造器，new Order() 不能通过编译，除非自己再写一个无参构造器。',
    keywords:'Java class constructor new this',
    points:['new 创建对象并调用构造器','构造器与类同名，没有返回类型','写了任何构造器就不再自动补无参构造器'],
    deep:[
      {title:'this.字段和参数',body:'参数和字段同名时，不写 this 的 amount 指参数。this.amount 才是这个对象的字段。'},
      {title:'怎样自己验证',body:'写只含 Order(int) 的类，分别编译 new Order(10) 和 new Order()。确认只有前者通过。'},
    ],
    refs:[['JLS：Constructor Declarations','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8'],['JLS：The Keyword this','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.8.3']]
  },
  {
    track:'java', group:'Java 基础', id:'java-static-member',
    title:'static 属于类，实例成员属于对象',
    prompt:'为什么启动用的 main 要写成 static？',
    promptAnswer:'启动时还没有你创建的对象。static 方法属于类，启动器可以直接调用。',
    core:'static 字段和方法属于类，用类名调用，不需要先 new。没有 static 的字段和方法属于某个对象，必须先有这个对象。实例方法里可以用 this，static 方法里没有当前对象，也就没有 this。启动器调用的 main 是 static，因为这时还没有你写的实例，见 `java-main-launcher`。',
    example:'main 里还没有实例：\n\n```java\nclass App {\n  static int count;\n  int id;\n  public static void main(String[] args) {\n    count = 1;\n    App one = new App();\n    one.id = 1;\n  }\n}\n```',
    task:'说明 count 和 id 谁可以在 main 里直接写。为什么 main 是 static。',
    answer:'count 是 static，属于类，main 里可以直接写。id 属于对象，要先 new 出一个 App。main 是 static，因为启动器调用它的时候还没有实例，见 `java-main-launcher`。',
    keywords:'Java static instance main this',
    points:['static 成员属于类','实例成员属于对象','main 是 static，启动时还没有实例'],
    deep:[
      {title:'static 方法里没有 this',body:'static 方法不针对某一个对象，不能写 this。要用实例字段，就先创建对象，再通过那个对象去读。'},
      {title:'怎样自己验证',body:'在 main 里给 static 字段赋值，确认可以编译。再在 main 里不 new 就给实例字段赋值，确认编不过。'},
    ],
    refs:[['JLS：Method Modifiers','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.3'],['JLS：Invoke a main Method','https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html#jls-12.1.4']]
  },
  {
    track:'java', group:'Java 基础', id:'java-package-access',
    title:'类放在包里，访问权限分四档',
    prompt:'字段什么修饰符都不写，别的包为什么读不到？',
    promptAnswer:'不写修饰符就是包访问，只有同一个包能用。另外三档是 public、protected 和 private。',
    core:'package 把类分组。文件开头的 package com.shop; 表示这个编译单元里的类型属于该包。import 让你少写包名，不会把类复制进来。访问权限（access control）有四档：public 任何包都能用；protected 本包能用，子类还要再看位置；不写修饰符是包访问，只有本包能用；private 只有本类能用。文件最外层的类只能是 public 或包访问。别的包里的子类能用到多少 protected，见 `java-protected-other-pkg-subclass`。',
    example:'不写修饰符就停在本包：\n\n```java\npackage com.shop;\n\npublic class Order {\n  private int amount;\n  int qty;\n}\n```',
    task:'按任何包、本包、本类，给 public、包访问、private 各归一位。import 改变访问权限吗？',
    answer:'public 任何包都能用。不写修饰符只有本包能用。private 只有本类能用。protected 本包能用，跨包子类的范围见 `java-protected-other-pkg-subclass`。import 只缩短名字，不改变这四档。',
    keywords:'Java package import access control public private protected',
    points:['package 决定类属于哪一组','不写修饰符只有本包能用','import 不改变访问权限'],
    deep:[
      {title:'最外层的类没有 private',body:'一个文件最外层的类不能写成 private 或 protected。private 用于类里面的成员。'},
      {title:'怎样自己验证',body:'在 com.shop 里写一个不带修饰符的字段，从另一个包读取，确认编译失败。加上 public 后再读，确认可以通过。'},
    ],
    refs:[['JLS：Access Control','https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.6'],['JLS：Packages and Modules','https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-extends-override',
    title:'extends 得到父类的实例方法，同签名才是覆盖',
    prompt:'子类写了同名方法，为什么有时跑的仍是父类那一版？',
    promptAnswer:'实例方法签名相同才是覆盖，调用看对象的实际类型。参数不同是重载。static 同名只是隐藏。',
    core:'extends 声明子类。子类带有父类的实例字段和实例方法。子类写出签名相同的实例方法，就是覆盖（override）。变量的编译类型是父类、实际对象是子类时，调用的是子类覆盖后的方法。@Override 让编译器核对它确实在覆盖。super.方法() 调用父类的那一版。static 方法不能这样覆盖，同签名只是隐藏。只改参数类型是重载，见 `java-method-overload`。实现接口也是多态，见 `java-polymorphism-not-only-extends`。',
    example:'同签名的实例方法才被调用到：\n\n```java\nclass Money {\n  int cents() { return 100; }\n}\nclass Cny extends Money {\n  @Override\n  int cents() { return super.cents() + 1; }\n}\nMoney m = new Cny();\n// m.cents() 是 101\n```',
    task:'说明 Money m = new Cny() 时 m.cents() 调用哪一版。参数不同的同名方法算覆盖吗？',
    answer:'m 的实际对象是 Cny，cents() 签名相同，调用的是 Cny 里覆盖后的方法，结果是 101。super.cents() 仍是父类的 100。参数类型不同是重载，不是覆盖。static 同名只是隐藏。',
    keywords:'Java extends override Override super',
    points:['extends 声明子类','同签名实例方法才是覆盖','super 调用父类的那一版'],
    deep:[
      {title:'访问不能比父类更窄',body:'父类方法是 public 时，子类覆盖它也要是 public。改成更窄的访问权限，编译失败。@Override 会帮你发现签名其实没对上。'},
      {title:'怎样自己验证',body:'用 Money m = new Cny() 调用 cents()，确认结果是 101。去掉 @Override 再改掉参数，确认编译器不再把它当成覆盖。'},
    ],
    refs:[['JLS：Overriding','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.8.1'],['JLS：Method Invocation Expressions','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.12']]
  },
  {
    track:'java', group:'Java 基础', id:'java-interface-implements',
    title:'interface 规定方法，implements 由类去实现',
    prompt:'类已经可以 extends，为什么还要 interface？',
    promptAnswer:'一个类只能 extends 一个父类。interface 规定调用方能用哪些方法，一个类可以实现多个接口。',
    core:'interface 规定一组方法。类用 implements 表示自己提供这些方法。一个类只能 extends 一个类，可以实现多个接口。接口类型的变量可以指向实现类的对象，调用时用对象上的方法。接口方法默认是 public，实现方法也要是 public。接口里的字段默认是 public static final，不是每个对象一份。默认方法怎样冲突，见 `java-interface-contract`。',
    example:'一个类实现接口：\n\n```java\ninterface Payable {\n  int cents();\n}\nclass Bill implements Payable {\n  public int cents() { return 100; }\n}\nPayable p = new Bill();\n```',
    task:'一个类能 extends 几个类，能 implements 几个接口？实现方法为什么写成 public？',
    answer:'一个类只能 extends 一个类，可以实现多个接口。接口方法默认 public，实现方法也要是 public，写成更窄的访问权限编不过。默认方法见 `java-interface-contract`。',
    keywords:'Java interface implements public',
    points:['interface 规定一组方法','一个类只能有一个父类，可以实现多个接口','实现方法要是 public'],
    deep:[
      {title:'接口字段不是实例字段',body:'写在接口里的字段默认 public static final，整个接口共用一份。每个对象自己的数据写在类的实例字段里。'},
      {title:'怎样自己验证',body:'写 Payable 和 Bill，用 Payable 变量指向 Bill。把 cents() 的 public 去掉，确认编译失败。'},
    ],
    refs:[['JLS：Interface Declarations','https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.1'],['JLS：Interface Members','https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.3']]
  },
  {
    track:'java', group:'Java 基础', id:'java-try-catch-throws',
    title:'throw 现在抛出异常，throws 声明可能交给调用方',
    prompt:'方法签名上的 throws 和方法里的 throw 各做什么？',
    promptAnswer:'throw 是现在抛出一个异常对象。throws 写在方法上，表示这个方法可能把异常交给调用方。',
    core:'try 后面的块如果抛出异常，就按类型寻找 catch。匹配的 catch 执行后，这个异常算被接住。finally 里的代码无论是否抛出都会执行。throw 立刻抛出一个异常对象。方法声明上的 throws 表示可能把异常交给调用方，它自己并不抛出。哪些异常必须写上 throws 或被 catch，见 `java-unchecked-not-must-catch`。离开块时关闭资源用 try-with-resources，见 `java-exceptions`。',
    example:'throw 抛出，throws 写在签名上：\n\n```java\nvoid load() throws java.io.IOException {\n  try {\n    throw new java.io.IOException("read");\n  } catch (java.io.IOException ex) {\n    throw ex;\n  } finally {\n    // 无论是否抛出都会执行\n  }\n}\n```',
    task:'用一句话区分 throw 和 throws。finally 在抛出时还会不会执行。',
    answer:'throw 现在抛出一个异常对象。throws 写在方法声明上，告诉调用方这个方法可能把异常交出来。finally 在正常结束和抛出时都会执行。检查异常是否必须处理，见 `java-unchecked-not-must-catch`。',
    keywords:'Java try catch finally throw throws',
    points:['throw 抛出异常对象','throws 声明方法可能把异常交给调用方','finally 无论是否抛出都会执行'],
    deep:[
      {title:'接住之后调用方才看不见',body:'catch 里再次 throw，异常继续往外走，方法上的 throws 仍要能对上。catch 之后正常返回，调用方看到的是返回，不是异常。'},
      {title:'怎样自己验证',body:'在 try 里 throw，catch 里打印后不再抛，确认调用方还能继续。再在 finally 里加一条打印，确认抛出和正常两条路都会执行到它。'},
    ],
    refs:[['JLS：The try statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20'],['JLS：Throw Statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.18']]
  },
  {
    track:'java', group:'Java 基础', id:'java-generic-diamond',
    title:'尖括号写上类型参数，右边的 <> 沿用左边',
    prompt:'List<String> names = new ArrayList<>(); 右边的尖括号为什么是空的？',
    promptAnswer:'左边已经写了 String。右边的空尖括号叫 diamond，编译器沿用左边的类型参数。',
    core:'泛型（generic type）用尖括号把类型参数写在类或接口名后面。List<String> 表示元素按 String 检查，add 一个整数会在编译期被拒绝。new ArrayList<>() 里的空尖括号叫 diamond（JDK 7），编译器从左边的 List<String> 推断出同样的类型参数。类型参数在运行时会被擦除，见 `java-generics`。List、Set、Map 各自装什么，见 `java-list-set-map`。',
    example:'右边沿用左边的 String：\n\n```java\nList<String> names = new ArrayList<>();\nnames.add("a");\n// names.add(1) 编译失败\n```',
    task:'说明 new ArrayList<>() 的类型参数从哪里来。向 List<String> 加入整数会在什么时候失败。',
    answer:'类型参数来自左边的 List<String>，空尖括号是 diamond。加入整数在编译期失败。运行时擦除之后看不见 String，见 `java-generics`。',
    keywords:'Java generic diamond type argument JDK 7',
    points:['尖括号写上类型参数','diamond 从左边推断类型参数','不符合的元素在编译期被拒绝'],
    since:'JDK 7',
    deep:[
      {title:'左边决定能放什么',body:'List<String> 只能放 String。要放整数就写成 List<Integer>，基本类型 int 要先用包装类 Integer。'},
      {title:'怎样自己验证',body:'写 List<String> names = new ArrayList<>()，add 一个字符串，再 add 一个整数。确认只有整数那一行编译失败。'},
    ],
    refs:[['JLS：Parameterized Types','https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.5'],['JLS：Class Instance Creation','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.9']]
  },
  {
    track:'java', group:'Java 基础', id:'java-enum-constants',
    title:'enum 把固定的几个值声明成类型自己的常量',
    prompt:'订单状态为什么不写成 int 的 0 和 1？',
    promptAnswer:'enum 把允许的值写成这个类型自己的常量。别的整数不能赋给它。',
    core:'enum 声明一种类型，花括号里的常量是这个类型的实例，例如 PENDING 和 PAID。变量的类型就是这个 enum，不能赋一个随便的 int，也不能从外面 new。常量可以放进冒号 switch 的 case，见 `java-switch-colon`。这些常量在类初始化时就创建好了，和延迟初始化的写法差别见 `java-dcl-volatile-enum`。',
    example:'只接受声明过的常量：\n\n```java\nenum Status { PENDING, PAID }\nStatus s = Status.PENDING;\nswitch (s) {\n  case PENDING:\n    break;\n  case PAID:\n    break;\n}\n```',
    task:'说明 Status 变量能不能赋成 1。常量在什么时候已经存在。',
    answer:'Status 只能是 PENDING 或 PAID 这样的常量，不能赋 int 1，也不能从外面 new。常量在这个 enum 的类初始化时创建。switch 的冒号形式见 `java-switch-colon`。',
    keywords:'Java enum constant switch',
    points:['enum 的常量是这个类型的实例','不能把随便的 int 赋给 enum','外面不能 new 一个 enum 常量'],
    since:'JDK 5',
    deep:[
      {title:'构造器外面叫不到',body:'enum 可以有字段和构造器，构造器是私有的。新的实例只有声明里的那几个常量，没有 public 构造器给外面调用。'},
      {title:'怎样自己验证',body:'声明 Status，把 Status.PENDING 赋给变量。再尝试赋 1，确认编译失败。'},
    ],
    refs:[['JLS：Enum Types','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.9'],['Enum','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Enum.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_118) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
