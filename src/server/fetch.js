import axios from 'axios';

export async function getRepartidores(){
    const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnb256YWxvLmNhc3RpbGxvQHBhaW5hbmkubXgiLCJyb2xlcyI6IlZhbGlkYWRvcixBbmFsaXN0YSxDQUMsQWRtaW5pc3RyYWRvciJ9.f_bKUhV1-_EEVMBIw19EbqPxUGWdxkDV8nC69QmPXbkXbrbPvDNPmvIIsqdMM0K4MlTaufAJC6oUTsEVKO9QFg` }
    };
    try{
        const result = await axios.get(`https://painani2.herokuapp.com/empleados/repartidores/cac/1/disponibilidad`, config);
        const data = result.json();

        console.log('resultado -->', result);
        return result;
    }catch(e){
        return null;
    }
}