// Файл: deleteConfiguration.test.js
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { deleteConfiguration } from "./deleteConfiguration";

jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    deleteDoc: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
    db: {},
}));

describe("deleteConfiguration", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window, 'alert').mockImplementation(() => {}); // Мокаємо window.alert
    });

    test("успішно видаляє конфігурацію та оновлює стан", async () => {
        const user = { uid: "test-uid" };
        const configId = "config-id";
        const mockSetConfigurations = jest.fn();
        const mockConfigurations = [
            { id: "config-id" },
            { id: "other-config" }
        ];

        doc.mockReturnValueOnce("mocked-doc-ref");
        deleteDoc.mockResolvedValueOnce();

        await deleteConfiguration(user, configId, mockSetConfigurations, mockConfigurations);

        expect(doc).toHaveBeenCalledWith(db, "user_configurations", user.uid, "configurations", configId);
        expect(deleteDoc).toHaveBeenCalledWith("mocked-doc-ref");
        expect(mockSetConfigurations).toHaveBeenCalledWith([{ id: "other-config" }]);
        expect(window.alert).toHaveBeenCalledWith("Збірка видалена!");
    });

    test("обробляє помилки при видаленні конфігурації", async () => {
        const user = { uid: "test-uid" };
        const configId = "config-id";
        const mockSetConfigurations = jest.fn();
        const mockConfigurations = [
            { id: "config-id" },
            { id: "other-config" }
        ];

        const mockError = new Error("Помилка видалення");
        doc.mockReturnValueOnce("mocked-doc-ref");
        deleteDoc.mockRejectedValueOnce(mockError);

        console.error = jest.fn();
        window.alert = jest.fn();

        await deleteConfiguration(user, configId, mockSetConfigurations, mockConfigurations);

        expect(doc).toHaveBeenCalledWith(db, "user_configurations", user.uid, "configurations", configId);
        expect(deleteDoc).toHaveBeenCalledWith("mocked-doc-ref");
        expect(console.error).toHaveBeenCalledWith("Помилка видалення:", mockError);
        expect(window.alert).toHaveBeenCalledWith("Не вдалося видалити збірку.");
    });
});
