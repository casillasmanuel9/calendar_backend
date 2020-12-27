import moment from 'moment';

export const isDate = (value: Date) => {
    console.log(value);/* 
    console.log(rest); */
    if(!value) {
        return false;
    }

    const fecha = moment(value);

    if(fecha.isValid()) {
        return true;
    }
    
    return false;
}