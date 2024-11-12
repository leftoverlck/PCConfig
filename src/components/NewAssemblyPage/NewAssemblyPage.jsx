import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { processors, ram, gpus, ssdStorage, motherboards, psus } from '../../utils/componentsUtils';
import { useSaveAssembly } from '../../hooks/useSaveAssembly';
import { useNavigate } from 'react-router-dom'; // додано для перенаправлення
import ProductInfo from '../ProductInfo/ProductInfo';
import styles from './NewAssemblyPage.module.css';

const NewAssemblyPage = () => {
    const { user } = useAuth();
    const { saveAssembly, loading, error } = useSaveAssembly();
    const navigate = useNavigate(); // хук для навігації

    const [selectedProcessor, setSelectedProcessor] = useState(null);
    const [selectedRam, setSelectedRam] = useState(null);
    const [selectedGpu, setSelectedGpu] = useState(null);
    const [selectedSsd, setSelectedSsd] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [selectedPsu, setSelectedPsu] = useState(null);
    const [assemblyName, setAssemblyName] = useState('');

    // Обчислення загальної вартості
    const totalCost =
        (selectedProcessor ? selectedProcessor.price : 0) +
        (selectedRam ? selectedRam.price : 0) +
        (selectedGpu ? selectedGpu.price : 0) +
        (selectedSsd ? selectedSsd.price : 0) +
        (selectedMotherboard ? selectedMotherboard.price : 0) +
        (selectedPsu ? selectedPsu.price : 0);

    // Витягування мінімальної ціни з кожної категорії
    const minProcessorPrice = processors.length > 0 ? Math.min(...processors.map((p) => p.price)) : 0;
    const minRamPrice = ram.length > 0 ? Math.min(...ram.map((r) => r.price)) : 0;
    const minGpuPrice = gpus.length > 0 ? Math.min(...gpus.map((g) => g.price)) : 0;
    const minSsdPrice = ssdStorage.length > 0 ? Math.min(...ssdStorage.map((s) => s.price)) : 0;
    const minMotherboardPrice = motherboards.length > 0 ? Math.min(...motherboards.map((m) => m.price)) : 0;
    const minPsuPrice = psus.length > 0 ? Math.min(...psus.map((p) => p.price)) : 0;

    // Виводимо мінімальні ціни та загальну вартість у консоль
    useEffect(() => {
        console.log('Мінімальна ціна процесора:', minProcessorPrice);
        console.log('Мінімальна ціна RAM:', minRamPrice);
        console.log('Мінімальна ціна GPU:', minGpuPrice);
        console.log('Мінімальна ціна SSD:', minSsdPrice);
        console.log('Мінімальна ціна Материнської плати:', minMotherboardPrice);
        console.log('Мінімальна ціна PSU:', minPsuPrice);
        console.log('Загальна вартість збірки:', totalCost);
    }, [selectedProcessor, selectedRam, selectedGpu, selectedSsd, selectedMotherboard, selectedPsu]);

    const handleSave = () => {
        if (user) {
            const assemblyData = {
                name: assemblyName,
                processor: selectedProcessor ? selectedProcessor.name : '',
                processorPrice: selectedProcessor ? selectedProcessor.price : 0,
                ram: selectedRam ? selectedRam.name : '',
                ramPrice: selectedRam ? selectedRam.price : 0,
                gpu: selectedGpu ? selectedGpu.name : '',
                gpuPrice: selectedGpu ? selectedGpu.price : 0,
                ssd: selectedSsd ? selectedSsd.name : '',
                ssdPrice: selectedSsd ? selectedSsd.price : 0,
                motherboard: selectedMotherboard ? selectedMotherboard.name : '',
                motherboardPrice: selectedMotherboard ? selectedMotherboard.price : 0,
                psu: selectedPsu ? selectedPsu.name : '',
                psuPrice: selectedPsu ? selectedPsu.price : 0,
                totalCost,
            };

            console.log('Збереження збірки:', assemblyData);
            saveAssembly(user.uid, assemblyData); // збереження збірки
            navigate('/profile'); // перенаправлення на профіль
        }
    };

    return (
        <div className={styles.newAssemblyPage}>
            <main className={styles.mainContent}>
                <h1 className={styles.title}>Нова збірка</h1>
                <div className={styles.form}>
                    <label className={styles.label}></label>
                </div>
                <div className={styles.selects}>
                    <select
                        className={styles.select}
                        onChange={(e) => setSelectedProcessor(processors.find((p) => p.name === e.target.value))}
                    >
                        <option>Процесор</option>
                        {processors.map((processor, index) => (
                            <option key={index} value={processor.name}>
                                {processor.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        onChange={(e) => setSelectedRam(ram.find((r) => r.name === e.target.value))}
                    >
                        <option>Оперативна пам'ять</option>
                        {ram.map((memory, index) => (
                            <option key={index} value={memory.name}>
                                {memory.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        onChange={(e) => setSelectedGpu(gpus.find((g) => g.name === e.target.value))}
                    >
                        <option>Відеокарта</option>
                        {gpus.map((gpu, index) => (
                            <option key={index} value={gpu.name}>
                                {gpu.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        onChange={(e) => setSelectedSsd(ssdStorage.find((s) => s.name === e.target.value))}
                    >
                        <option>Накопичувач SSD</option>
                        {ssdStorage.map((ssd, index) => (
                            <option key={index} value={ssd.name}>
                                {ssd.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        onChange={(e) => setSelectedMotherboard(motherboards.find((m) => m.name === e.target.value))}
                    >
                        <option>Материнська плата</option>
                        {motherboards.map((motherboard, index) => (
                            <option key={index} value={motherboard.name}>
                                {motherboard.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className={styles.select}
                        onChange={(e) => setSelectedPsu(psus.find((p) => p.name === e.target.value))}
                    >
                        <option>Живлення PSU</option>
                        {psus.map((psu, index) => (
                            <option key={index} value={psu.name}>
                                {psu.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleSave} disabled={loading}>
                        {loading ? 'Збереження...' : 'Зберегти збірку'}
                    </button>
                </div>
                <ProductInfo
                    selectedComponents={{
                        processor: selectedProcessor ? selectedProcessor.name : 'Не вибрано',
                        ram: selectedRam ? selectedRam.name : 'Не вибрано',
                        gpu: selectedGpu ? selectedGpu.name : 'Не вибрано',
                        ssd: selectedSsd ? selectedSsd.name : 'Не вибрано',
                        motherboard: selectedMotherboard ? selectedMotherboard.name : 'Не вибрано',
                        psu: selectedPsu ? selectedPsu.name : 'Не вибрано',
                    }}
                />
            </main>
        </div>
    );
};

export default NewAssemblyPage;
