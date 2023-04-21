import http from '../http-common';
import QuestionData from './types';

class QuestionService {
    get(id: string) {
        return http.get<QuestionData>(`/courses/${id}`);
    }
    create(data: QuestionData) {
        return http.post<QuestionData>("/course", data);
    }
    delete(id: any) {
        return http.delete<any>(`/courses/${id}`);
    }
}

export default new QuestionService();