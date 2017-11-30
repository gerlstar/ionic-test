import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {File} from '@ionic-native/file';
import {FileMgmtService} from '../../shared/file-mgmt-service/file-mgmt-service';
import {FileOpener} from '@ionic-native/file-opener';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {Platform} from 'ionic-angular';

@Injectable()
export class PdfService {


    // public currentUser :object;
    constructor(private file: File, private filemgmt: FileMgmtService, private fileopener: FileOpener,
                private transfer: FileTransfer, private platform: Platform) {
    }

    /**
     * Convert a base64 string in a Blob according to the data and contentType.
     *
     * @param b64Data {String} Pure base64 string without contentType
     * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
     * @param sliceSize {Int} SliceSize to process the byteCharacters
     * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @return Blob
     */
    b64toBlob(b64Data, contentType, sliceSize?) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    /**
     * Opens a file
     * @param {string} url - url of the file in your mobile
     * @param {string} contentType - content type of the file (eg applicaton/pdf, text/html or text/plain)
     */
    openFile(url: string, contentType: string) {
        this.fileopener.open(url, contentType)
            .then(() => {
                alert('File is opened');
                // URL.revokeObjectURL(blobUrl);
            })
            .catch(e => {
                alert('Error openening file' + e.message);
                alert(JSON.stringify(e));
                // URL.revokeObjectURL(blobUrl);
            });
    }

    /**
     * Get a file from your phone
     * @param {string} folderPath - folder path of where your fileName is
     * @param {string} fileName - name of the file that you want to get
     * @param {string} contentType - content type of the file (eg applicaton/pdf, text/html or text/plain)
     */
    retrieveFile(folderPath: string, fileName: string, contentType: string) {
        //getting the newly written file
        this.file.resolveDirectoryUrl(folderPath)
            .then(res => {
                alert('resolve directoryurl success = ' + res);
                alert(JSON.stringify(res));

                this.file.getFile(res, fileName, {})
                    .then(res => {
                        alert('success in getFile');
                        alert(JSON.stringify(res));

                        this.openFile(res.nativeURL, contentType);
                    })
                    .catch(err => {
                        alert(JSON.stringify(err));
                        alert("failed in getFile");
                    });
                // this.openFile()
            })
            .catch(err => {
                alert(' failed resolve directory url');
            });
    }

    /**
     * Writes to a file in your mobile
     * @param {string} folderPath - folder path of where your fileName is
     * @param {string} fileName - name of the file that you want to get
     * @param content - content of your fileName. CAn be a string or a Blob object
     * @param {string} contentType - content type of the file (eg applicaton/pdf, text/html or text/plain)
     */
    writeToFile(folderPath: string, fileName: string, content: any, contentType: string) {
        this.file.writeFile(folderPath, fileName, content, {replace: true})
            .then(() => {
                alert('success in writing to a file... opening file..');
                this.retrieveFile(folderPath, fileName, contentType)

            })
            .catch(err => {
                alert('Error in writing to a file ' + err);
            })
    }

    /**
     * Creates a pdf file from its base64 content
     * @param {string} folderPath - folder path of where your fileName is
     * @param {string} fileName - name of the file that you want to get
     * @param myBase64Content - database64 content. CAnnot contain (data:application/pdf;base64).
     * Only the base64 string is expected.
     * @param {string} contentType - content type of the file (eg applicaton/pdf, text/html or text/plain)
     */
    public downloadBlobPDF(folderPath: string, fileName: string, myBase64Content: any, contentType: string) {
        var DataBlob = this.b64toBlob(myBase64Content, contentType);
        const msg = 'DataBlob =' + DataBlob;
        if (this.platform.is('mobile')) {
            alert('---');
            this.writeToFile(folderPath, fileName, DataBlob, contentType)

        } else if (this.platform.is('core')) { //DESKTOP!
            console.log(msg);
            console.log(typeof DataBlob);
            // console.log(JSON.stringify(DataBlob));
            const dataURL = window.URL.createObjectURL(DataBlob);
            window.open(dataURL);

            //timeout of 5 mins; this is for clean up purposes
            window.setTimeout(function () {
                window.URL.revokeObjectURL(dataURL);
            }, 300000);
        }

    }

    public downloadBlobPDF2(folderPath: string, fileName: string, myBase64Content: any, contentType: string) {
        var DataBlob = this.b64toBlob(myBase64Content, contentType);
        const msg = 'DataBlob =' + DataBlob;
        if (this.platform.is('mobile')) {
            // alert(DataBlob);
            this.file.writeFile(folderPath, fileName, DataBlob, {replace: true})
                .then(() => {
                    alert('success in writing to a file... opening file..');
                    //getting the newly written file
                    this.file.resolveDirectoryUrl(folderPath)
                        .then(res => {
                            alert('resolve directoryurl success = ' + res);
                            alert(JSON.stringify(res));

                            this.file.getFile(res, fileName, {})
                                .then(res => {
                                    alert('success in getFile');
                                    alert(JSON.stringify(res));

                                    this.fileopener.open(res.nativeURL, contentType)
                                        .then(() => {
                                            alert('File is opened');
                                            // URL.revokeObjectURL(blobUrl);
                                        })
                                        .catch(e => {
                                            alert('Error openening file' + e.message);
                                            alert(JSON.stringify(e));
                                            // URL.revokeObjectURL(blobUrl);
                                        });
                                })
                                .catch(err => {
                                    alert(JSON.stringify(err));
                                    alert("failed in getFile");
                                });
                            // this.openFile()
                        })
                        .catch(err => {
                            alert(' failed resolve directory url');
                        });

                })
                .catch(err => {
                    alert('Error in writing to a file ' + err);
                })

        } else if (this.platform.is('core')) { //DESKTOP!
            console.log(msg);
            console.log(typeof DataBlob);
            // console.log(JSON.stringify(DataBlob));
            const dataURL = window.URL.createObjectURL(DataBlob);
            window.open(dataURL);

            //timeout of 5 mins; this is for clean up purposes
            window.setTimeout(function () {
                window.URL.revokeObjectURL(dataURL);
            }, 300000);
        }

    }

    public downloadPDF() {
        alert('downloading some pdf online...');
        const fileTransfer: FileTransferObject = this.transfer.create();
        const mime = 'application/pdf';
        const pdfFile = 'http://ciiam.ca/docs/sig_cdn_balanced.pdf';
        // alert(this.file.dataDirectory);
        fileTransfer.download(pdfFile, this.file.externalDataDirectory + 'file.pdf', true)
            .then((entry) => {
                alert('download complete: ' + entry.toURL());

                //getting the newly written file
                this.file.resolveDirectoryUrl(this.file.externalDataDirectory)
                    .then(res => {
                        alert('resolve directoryurl success = ' + res);
                        alert(JSON.stringify(res));

                        const folderNamePath = this.file.externalDataDirectory;
                        const fileName = 'file.pdf';
                        this.file.checkFile(folderNamePath, fileName)
                            .then(_ => {
                                alert(fileName + ' exists');
                                this.file.getFile(res, fileName, {})
                                    .then(res => {
                                        alert('success in getFile');
                                        alert(JSON.stringify(res));
                                        this.fileopener.open(res.nativeURL, mime)
                                            .then(() => {
                                                alert('File is opened');
                                                // URL.revokeObjectURL(blobUrl);
                                            })
                                            .catch(e => {
                                                alert('Error openening file' + e.message);
                                                alert(JSON.stringify(e));
                                                // URL.revokeObjectURL(blobUrl);
                                            });
                                    })
                                    .catch(err => {
                                        alert("failed in getFile");
                                    })

                            })
                            .catch(err => {
                                alert(fileName + ' doesnt exists');
                            });


                    })
                    .catch(err => {
                        alert(' failed resolve directory url');
                    });

            }, (error) => {
                // handle error
            });


    }


}

