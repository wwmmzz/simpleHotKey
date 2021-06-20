
const isff = navigator?.userAgent.toLowerCase().indexOf('firefox') > 0
 
// Special Keys
enum _keyMap  {
  backspace= 8,
  tab= 9,
  clear= 12,
  enter= 13,
  return= 13,
  esc= 27,
  escape= 27,
  space= 32,
  left= 37,
  up= 38,
  right= 39,
  down= 40,
  del= 46,
  delete= 46,
  ins= 45,
  insert= 45,
  home= 36,
  end= 35,
  pageup= 33,
  pagedown= 34,
  capslock= 20,
  num_0= 96,
  num_1= 97,
  num_2= 98,
  num_3= 99,
  num_4= 100,
  num_5= 101,
  num_6= 102,
  num_7= 103,
  num_8= 104,
  num_9= 105,
  num_multiply= 106,
  num_add= 107,
  num_enter= 108,
  num_subtract= 109,
  num_decimal= 110,
  num_divide= 111,
  '⇪'= 20,
  ','= 188,
  '.'= 190,
  '/'= 191,
  '`'= 192,
  '-'= isff ? 173 : 189,
  '='= isff ? 61 : 187,
  ';'= isff ? 59 : 186,
  '\''= 222,
  '['= 219,
  ']'= 221,
  '\\'= 220,
};

// Modifier Keys
enum _modifier {
  // shiftKey
  '⇧'= 16,
  shift= 16,
  // altKey
  '⌥'= 18,
  alt= 18,
  option= 18,
  // ctrlKey
  '⌃'= 17,
  ctrl= 17,
  control= 17,
  // metaKey
  '⌘'= 91,
  cmd= 91,
  command= 91,
};
enum modifierMap  {
  shiftKey= 16,
  ctrlKey= 17,
  altKey= 18,
  metaKey= 91,
};

const _handlers = {};

// // F1~F12 special key
// for (let k = 1; k < 20; k++) {
//   _keyMap[`f${k}`] = 111 + k;
// }


type Key = keyof typeof _keyMap
let downKeys:Key[] = []
let handleKeys:Key[] = []
type Handle = ()=>any

interface IParams  {
    keys:Key[],
    scope?:HTMLElement,
    handle:Handle
}

const hotkeys = ({keys, scope=document.body,handle}:IParams)=>{
    handleKeys = keys.slice(0)
    scope.addEventListener('keydown',(e)=>{
        downKey(e,handle)
    })
    // scope.onkeydown =(e)=> downKey(e,handle)
    scope.addEventListener('keyup',(e)=>{
        upKey(e)
    })
}

let current:number = 0

const downKey = (e:KeyboardEvent,handle:Handle)=>{
  let key = parseInt((e.keyCode||e.charCode||e.which||e.code)+'')
    if(e.type=='keydown'&& handleKeys[current]===_keyMap[key]){
        downKeys.push(_keyMap[key] as Key)
        if(current == handleKeys.length-1&&downKeys.length==handleKeys.length){
            current+=1
          
            handle()
            return
        }else{
        console.log('落---》',current);
            
            current+=1
        }      
    }   
}

const upKey = (e:KeyboardEvent)=>{
    let key = parseInt((e.keyCode||e.charCode||e.which||e.code)+'')
    let enuKey = _keyMap[key] as Key
    if(e.type=='keyup'&&downKeys.indexOf(enuKey)!=-1){
        current-=1
        console.log('起---》',current);
        

        const i = downKeys.indexOf(enuKey)
        downKeys.splice(i,1)
    } 
}
console.log('123');

(window as any)['hotkey'] = hotkeys


