import IAdmin from './admin'

export default interface IApartment {
    name: string;
    aid?: Number | null;
    admin?: IAdmin;
    id?: Number | null;
    floor: Number;
    roomNum: Number;
    rule: String;
    notice: String;
    type: Number;
    createDate?: Date;
    updateDate?: Date;
}