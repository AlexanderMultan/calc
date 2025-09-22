import { Calculator } from './calculator.js';
import { themeChange } from './theme-change.js';
import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  new Calculator('#display', '.buttons');
  themeChange();
});
document.querySelector('#app').innerHTML = `
<div class="calculator">
    <div class="display">
        <input type="text" id="display" placeholder="0" readonly tabindex="-1">
    </div>
    <section class="buttons">
        <button class="button clear">AC</button>
        <button class="button neg-or-pos">+/-</button>
        <button class="button percent">&percnt;</button>
        <button class="button operator">&divide;</button>
       
        <button class="button">7</button>
        <button class="button">8</button>
        <button class="button">9</button>
        <button class="button operator">&times;</button>
       
        <button class="button">4</button>
        <button class="button">5</button>
        <button class="button">6</button>
        <button class="button operator">&minus;</button>
        
        <button class="button">1</button>
        <button class="button">2</button>
        <button class="button">3</button>
        <button class="button operator">&plus;</button>
        
        <button class="button zero">0</button>
        <button class="button">.</button>
        <button class="button equals">&equals;</button>
    </section>
</div>

<button class="theme-change-btn" id="theme-change-btn">Theme</button>
   `;
