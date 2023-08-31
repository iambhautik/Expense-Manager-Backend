import { isValidMongoId } from '@src/utils';
import { resMsg } from '@src/utils/response.messages';
import { Request, Response } from 'express';
import { createNewExpenseModal } from '../modal/expenses.modal';

interface ReturnResponse {
    message: string;
    success: boolean;
    data: any[];
}

interface CreateNewExpense{
    amount: number;
    expense_date: string;
    payment_method: string;
    user_id: string;
    description: string;
    main_category: string;
    sub_category: string;
}
export const createNewExpense = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
    try {

        const { body = {} } = req;

        const {amount, expense_date, payment_method, user_id, description, main_category, sub_category} = body

        if(!isValidMongoId(user_id) || !isValidMongoId(main_category) || !isValidMongoId(sub_category) || !isValidMongoId(payment_method)){
            return res.status(200).send({ message: resMsg.SOMETHING_WENT_WRONG, success: false, data: [] });
        }

        const new_body: CreateNewExpense = { amount, expense_date, payment_method, user_id, description, main_category, sub_category }

        const {success, data} = await createNewExpenseModal(new_body)

        if(success){
            return res.status(200).send({ message: resMsg.SOMETHING_WENT_WRONG, success: true, data: data });
        }

        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, success: false, data: [] });
    } catch (error) {
        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, success: false, data: [] });
    }
};
