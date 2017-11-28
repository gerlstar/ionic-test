import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Injectable()
export class FileMgmtService {


    // public currentUser :object;
    constructor(private file:File, private fileOpener: FileOpener) {
    }

    fileCheck(){
        console.clear();
        console.log(this.file);
        alert(this.file.dataDirectory);
        const folderName = 'Documents';
        const fileName = 'vanessa.txt';

        this.file.checkDir(this.file.dataDirectory, folderName)
            .then(_ => {
                console.log('Directory exists');
                alert(folderName + ' directory exists.. checking if file ' + fileName + ' exists...');

                const folderNamePath = this.file.dataDirectory + '/' + folderName;
                this.file.checkFile(folderNamePath, fileName)
                    .then( _ => {
                        alert(fileName + ' exists...');
                    })
                    .catch( err => {

                        if (err.code == 1){
                            alert(fileName + ' NOT FOUND');
                        }
                        alert(err.message);
                    });

            })
            .catch(err => {
                console.log('Directory doesnt exist');
                alert('MISSING DIRECTORY ' + folderName);
            });

    }

    listFiles(){
        const fileName = 'vanessa.txt';
        const folderName = 'Documents';
        this.file.listDir(this.file.dataDirectory, folderName)
            .then( res => {
                if (res.length < 1){
                    alert('NO files in the folder ' + folderName);
                    //write a file to a folder
                    this.writeToFolder(this.file.dataDirectory, fileName, 'htis is cool');
                }else{
                    alert(JSON.stringify(res));
                }

            })
            .catch(err => {

                alert('error: ' + err);
            });

    }

    writeToFolder(folderName:string, fileName:string, content: string) {
        this.file.writeFile(folderName, fileName, content, {replace: true})
            .then(() => {
                alert('success in writing to a file... opening file..');
                //getting the newly written file
                this.file.resolveDirectoryUrl(folderName)
                    .then( res => {
                        alert('resolve directoryurl success = ' + res);
                        alert(JSON.stringify(res));

                        this.getFile(res, fileName, {});
                        // this.openFile()
                    })
                    .catch( err => {
                        alert(' failed resolve directory url');
                    });



            })
            .catch((err) => {
                alert('Error in writing to a file ' + err);
            });

    }

    getFile(directoryEntry:any, fileName:string, flags:any){
        this.file.getFile(directoryEntry, fileName, flags)
            .then(res => {
                alert('success in getFile');
                alert(JSON.stringify(res));
                this.openFile(res.nativeURL)
            })
            .catch( err => {
                alert("failed in getFile");
            })

    }

    openFile(fileWithPathExt:string){
        this.fileOpener.open(fileWithPathExt, 'text/plain')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error openening file', e));
    }
}

