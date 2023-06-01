export default class utils {
    constructor(){

    }

    /**
     * Reformats the parameter code
     * @param {string} code 
     * @param {string} type 'course' || 'professor'
     */
    formatCode(code='NA', type='NA') {
        if (type === 'professor') {
            return code.split('_').join(' ');
        } else if (type === 'course') {
            const lastIndex = code.lastIndexOf(code.includes('.') ? '.' : '-');
            const _code = code.substring(0,lastIndex)+'-'+code.substring(lastIndex+1, code.length);
            return _code.split('-').splice(1,2).join(' ');
        }
    }

    getCodeFromUrl(code='NA', type='NA') {
        if (type === 'professor')
            return this.formatCode(code, type);
        else if (type === 'course') {
            const lastIndex = code.lastIndexOf(code.includes('.') ? '.' : '-');
            return code.substring(0,lastIndex)+'.'+code.substring(lastIndex+1, code.length);
        }
    }
}