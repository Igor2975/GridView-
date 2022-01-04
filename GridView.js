class GridView {
    /**
     * properties
     * @param [array] _tableClass - css классы оформления
     *  @param [array] _data -входные данные
     *  @param [array]attribyte-управляем что выводит
     *  @param [array] _element - куда выводим таблицу
     *  @param [array] _header - заголовок таблицы
     *  @param [array] _headerClass- классы оформления заголовка
     */

    constructor() {
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = 'body';
        this.attribute = [];
    }
    /**
     * проверяем заголовок
     */
    set header(header) {
        if (typeof header === 'string' && header.trim() != '') {
            this._header = header.trim()
        }
    }

    /**
     * проверяем классы оформления
     */
    set headerClass(headerClass) {
        if (typeof headerClass === 'object') {
            this._headerClass = headerClass;
            return true
        } else {
            return false
        }
    }
    /**
     * проверяем element
     */
     set element(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true
        } else {
            return false
        }
    }

    /**
     * Method for show GridView
     */
    render() {
        // show header
        if (this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass =>{
                header.classList.add(cssClass);
            })
            document.querySelector(this._element).append(header);
        }
        //show table
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass =>{
            table.classList.add(cssClass);
        })
        // create table header
         let trHeader = document.createElement('tr');
        for (let key in this.attribute) {
            let th = document.createElement('th');
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label;
            }
            else {
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);

        // cteate table
        for (let i = 0; i < this.data.length; i++){
            let dataArr = this.data[i]; // одна строка данных
            let tr = document.createElement('tr');
            for (let key in this.attribute) {
                let td = document.createElement('td');
                let value = dataArr[key];
                // есть ли функция
                if (this.attribute[key].value) {
                    value = this.attribute[key].value(dataArr)
                }
                // атрибут src
                if (this.attribute[key].src) {
                    td.innerHTML = value;
                }
                else {
                    td.textContent = value
                }
                tr.append(td)
            }
            table.append(tr)
        }

        document.querySelector(this._element).append(table);
    }
}