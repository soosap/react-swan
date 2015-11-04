/*
 |--------------------------------------------------------------------------
 | Create an alt-dispatcher (singleton)
 |--------------------------------------------------------------------------
 |
 | We are creating the alt-dispatcher here and are treating it as a
 | singleton. In a large app one could imagine having several
 | dispatchers in place for different parts of the app.
 | Having only one means that all stores are being
 | notified for all actions that are registered
 | with the dispatcher.
 |
*/
import Alt from 'alt';
export default new Alt();
