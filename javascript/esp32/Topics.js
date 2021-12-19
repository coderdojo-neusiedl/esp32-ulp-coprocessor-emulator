assertNamespace('esp32.topics.coprocessor.register');
assertNamespace('esp32.topics.coprocessor.flag');
assertNamespace('esp32.topics.memory');
assertNamespace('esp32.topics.editor');
assertNamespace('esp32.topics.parser');

//                PUBLICATIONS

/**
 * Each register publishes its current value (integer) which is a 16 bit integer (range 0 - 65535).
 *
 * example: {value:2}
 */
esp32.topics.coprocessor.register.r0         = '/coprocessor/register/0';
esp32.topics.coprocessor.register.r1         = '/coprocessor/register/1';
esp32.topics.coprocessor.register.r2         = '/coprocessor/register/2';
esp32.topics.coprocessor.register.r3         = '/coprocessor/register/3';
esp32.topics.coprocessor.register.stage_cnt  = '/coprocessor/register/stage_cnt';

/**
 * The coprocessor publishes the current state (boolean) of the ALU flags using the following topics.
 *
 * example: {value:true}
 */
esp32.topics.coprocessor.flag.zero           = '/coprocessor/flag/zero';
esp32.topics.coprocessor.flag.overflow       = '/coprocessor/flag/overflow';

/**
 * The coprocessor publishes the index (integer starting with 0) of the next command.
 *
 * example: {value:2}
 */
esp32.topics.coprocessor.nextCommandIndex    = '/coprocessor/nextCommandIndex';

/**
 * The data contains the current state of the parser.
 * 
 * example: {errorMessage: 'syntax error in line 2'}
 */
esp32.topics.parser.state                    = '/parser/state';

/**
 * The data contains the current state of the memory.
 * 
 * example: {errorMessage: 'the requested memory word does not exist'}
 */
esp32.topics.memory.state                    = '/memory/state';



//                COMMANDS

/**
 * Tells the coprocessor that the user wants to reset the coprocessor.
 */
esp32.topics.coprocessor.reset               = '/corpcocessor/reset';

/**
 * Tells the coprocessor that the user wants to execute the next command.
 */
esp32.topics.coprocessor.executeNextCommand  = '/corpcocessor/executeNextCommand';

/**
 * Tells the memory that the memory content needs to get cleared.
 */
esp32.topics.memory.clear  = '/memory/clear';

/**
 * Tells the memory that the attached memory word (command or variable) should get appended.
 */
esp32.topics.memory.append  = '/memory/add';

/**
 * Informs the recipients of this command that the content of the editor changed.
 * The data contains the content of the editor.
 * 
 * example: {lines:["move r0, 0","add r0, r0, 1","and r0, r1, 12"]}
 */
esp32.topics.editor.documentChanged          = '/editor/documentChanged';
