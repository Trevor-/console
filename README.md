# Console #
#### JSX Console for Adobe apps. ####
__CONSOLE Version 1.4.1 - 05 Aug 19__

__Works in most Adobe Creative Cloud apps, including After Effects, Illustrator, InCopy, InDesign, Photoshop and Premier Pro.__

![][console]

__Can be used without buttons__

![][consoleSmall]

* To execute line of code, press Enter.
* To execute selected lines of code without inserting a line break, press Option (Mac) / Alt (Windows) + Enter.
* To execute the entire snippet press Ctrl + Enter.
* To insert a line break without executing code press Shift + Enter.
* To open or save the snippets you need to click the buttons.

### Comparison with CSTK ###

* Console only works for executing ExtendScript scripts, UX is great.
* [CSTK](https://github.com/Trevor-/CSTK) has many more features but the UX is not so great _(When time allows I'll try update the CSTK's UX)_.

### How do I get set up? ###

The best way to set up is to clone the repository to a repository folder and create a symbolic link in the CEP extensions folder to the repositories com.creative-scripts.console sub-folder.

#### Mac ####
**In Terminal**
```Shell
mkdir -p "/Users/TREVOR/repositories"
cd "/Users/TREVOR/repositories"
git clone https://github.com/Trevor-/console
sudo ln -s "/Users/TREVOR/repositories/console/com.creative-scripts.console" "/Library/Application Support/Adobe/CEP/extensions/com.creative-scripts.console"
```

#### Windows ####
**In CMD as administrator (Type cmd in Windows search and then right click and choose run as administrator)**
```
if not exist "C:\Users\TREVOR\repositories" md "C:\Users\TREVOR\repositories"
cd "C:\Users\TREVOR\repositories"
git clone https://github.com/Trevor-/console
mklink /J  "C:\Program Files\Common Files\Adobe\CEP\extensions\com.creative-scripts.console"  "C:\Repositories\console\com.creative-scripts.console"
```

Replace **TREVOR** with your user name!

After you have done that one time then to update the extension just `cd` to the console repository folder and type `git pull`

**If you are a real beginner "developer" and can't handle the above then:**
Download a zip file of the signed extension from [here](https://github.com/Trevor-/console/raw/master/com.creative-scripts.console.zip) or the zxp file from [here](https://github.com/Trevor-/console/raw/master/com.creative-scripts.console.zxp) and follow the instructions [here](http://creative-scripts.com/where-to-plonk-my-extensions/)

### Helper Functions ###

In addition to the standard ExtendScript there are a few helper functions, these might depend a bit on the app being used.
* `$.props()` Lists the properties of an object, by default the selection or if there's no selection then the app.
* `$.leak()` Shows memory leakage / usage of functions between calls. Call before function (the first time you use $.leek call it twice) and then after the function.
* `$.writeln()` can contain css markup `$.writeln('Hi', 'background:blue;color:yellow;')`. Arrays and objects are automatically expanded, no `[object Object]`.
* `__doc()` returns the doc. Default current doc `__doc().name`
* `__sel()` returns the current selection `__sel().width` is easier than `app.selection[0].width`

### Change Log ###

* Version 1.4.1 - 05 Aug 19
    * Added persistence for Photoshop, InDesign and InCopy so the extension doesn't restart on closing and reopening the panel.

* Version 1.4 - 06 Mar 19
    * `__log()` can be turned off by using `__log.off = true` and back on with `__log.off = false`.
    * On Adobe Illustrator `__log(__doc().pageItems)` and `$.props(__doc().pageItems)` without the `[n]` no longer throw errors.
    * The same applies to all collections `pageItems` is just an example of a collection. InDesign treats collections very differently and was working. 
    * Clean up of __log.jsx.

* Version 1.3 - 05 Mar 19
    * Added buttons for changing console font size.
    * Improved $.props function to show methods as well.
    * Added $.props button to show properties and methods of selection.

### License ###

* If you nick any snippets from the code please at least put a credit with a link to this page in your binary code.
* Do not sue.
* Do not complain.
* Use with care.
* **No liability accepted NO MATTER WHAT.**
* Any disputes to be settled by my dad.
* Copyright Trevor [Creative Scripts](https://creative-scripts.com)


[console]: ./Images/console_v1_3.png
[consoleSmall]: ./Images/console_no_buttons.png