export const determineConfiguration = (answers) => {
    let config = {
        psu: '650W',
        ram: '8 GB DDR4',
        gpu: 'NVIDIA GTX 1650',
        cpu: 'Intel Core i5-11400F',
        storage: 'SSD 256 GB',
        motherboard: 'MSI B560M PRO',
        totalPrice: 12000, // ціна як число для зручності
    };

    // Перевірка для ігор
    if (answers[0] === 'Ігри') {
        if (answers[2] === 'Більше 50 000 грн') {
            config = {
                psu: '850W Platinum Certified',
                ram: '64 GB DDR4',
                gpu: 'NVIDIA GeForce RTX 4090',
                cpu: 'Intel Core i9-13900K',
                storage: 'SSD 4 TB NVMe',
                motherboard: 'ASUS ROG Strix Z790-E Gaming',
                totalPrice: 120000, // ціна в числовому форматі
            };
        } else if (answers[2] === '40 000 - 50 000 грн') {
            config = {
                psu: '750W Platinum Certified',
                ram: '32 GB DDR4',
                gpu: 'NVIDIA GeForce RTX 3080 Ti',
                cpu: 'AMD Ryzen 9 7900X',
                storage: 'SSD 2 TB NVMe',
                motherboard: 'MSI MPG Z790 EDGE WIFI',
                totalPrice: 48000,
            };
        } else if (answers[2] === '20 000 - 40 000 грн') {
            config = {
                psu: '750W Gold Certified',
                ram: '16 GB DDR4',
                gpu: 'NVIDIA RTX 3070',
                cpu: 'Intel Core i7-12700K',
                storage: 'SSD 1 TB NVMe',
                motherboard: 'ASUS TUF Z690-PLUS WIFI D4',
                totalPrice: 35000,
            };
        } else if (answers[2] === '10 000 - 20 000 грн') {
            config = {
                psu: '650W',
                ram: '16 GB DDR4',
                gpu: 'NVIDIA GTX 1660 Ti',
                cpu: 'Intel Core i5-12400F',
                storage: 'SSD 1 TB',
                motherboard: 'Gigabyte B560M DS3H',
                totalPrice: 18000,
            };
        } else {
            config = {
                psu: '550W',
                ram: '8 GB DDR4',
                gpu: 'NVIDIA GTX 1650',
                cpu: 'Intel Core i3-12100F',
                storage: 'HDD 1 TB',
                motherboard: 'Asrock B460M-HDV',
                totalPrice: 10000,
            };
        }
    } else if (answers[0] === 'Офісні завдання (документи, таблиці)') {
        if (answers[2] === '5 000 - 10 000 грн') {
            config = {
                psu: '450W',
                ram: '4 GB DDR4',
                gpu: 'Intel UHD Graphics 630',
                cpu: 'Intel Core i3-10100',
                storage: 'HDD 500 GB',
                motherboard: 'ASRock B460M-HDV',
                totalPrice: 6000,
            };
        } else {
            config = {
                psu: '500W',
                ram: '8 GB DDR4',
                gpu: 'Intel UHD Graphics 630',
                cpu: 'Intel Core i3-10100',
                storage: 'HDD 1 TB',
                motherboard: 'ASRock B460M-HDV',
                totalPrice: 8000,
            };
        }
    }

    // Для користувачів Linux
    if (answers[1] === 'Linux') {
        config.cpu = 'AMD Ryzen 5 5600X';
    }

    // Додаткові варіанти для програмування
    if (answers[0] === 'Навчання та програмування') {
        if (answers[2] === 'Більше 50 000 грн') {
            config = {
                psu: '750W Gold Certified',
                ram: '32 GB DDR4',
                gpu: 'NVIDIA RTX A4000',
                cpu: 'AMD Ryzen 9 7950X',
                storage: 'SSD 2 TB NVMe',
                motherboard: 'MSI MEG X570 GODLIKE',
                totalPrice: 55000,
            };
        } else if (answers[2] === '40 000 - 50 000 грн') {
            config = {
                psu: '750W Gold Certified',
                ram: '32 GB DDR4',
                gpu: 'NVIDIA RTX 3070 Ti',
                cpu: 'Intel Core i9-12900K',
                storage: 'SSD 1.5 TB NVMe',
                motherboard: 'ASUS ROG Strix Z690-F',
                totalPrice: 48000,
            };
        } else if (answers[2] === '20 000 - 40 000 грн') {
            config = {
                psu: '650W',
                ram: '16 GB DDR4',
                gpu: 'NVIDIA GTX 1660 SUPER',
                cpu: 'Intel Core i7-12700',
                storage: 'SSD 1 TB NVMe',
                motherboard: 'ASUS TUF Gaming Z690-Plus WiFi',
                totalPrice: 30000,
            };
        } else {
            config = {
                psu: '550W',
                ram: '8 GB DDR4',
                gpu: 'Intel UHD Graphics',
                cpu: 'Intel Core i5-11400',
                storage: 'SSD 512 GB',
                motherboard: 'MSI B460M PRO',
                totalPrice: 15000,
            };
        }
    }

    // Додаткові варіанти для графічних завдань
    if (answers[0] === 'Робота з графікою (редагування фото/відео)') {
        if (answers[2] === 'Більше 50 000 грн') {
            config = {
                psu: '850W Platinum',
                ram: '64 GB DDR4',
                gpu: 'NVIDIA RTX 4090',
                cpu: 'Intel Core i9-13900K',
                storage: 'SSD 4 TB NVMe',
                motherboard: 'ASUS ROG Strix X670-E',
                totalPrice: 130000,
            };
        } else if (answers[2] === '40 000 - 50 000 грн') {
            config = {
                psu: '750W Gold Certified',
                ram: '32 GB DDR4',
                gpu: 'NVIDIA RTX 3080 Ti',
                cpu: 'AMD Ryzen 7 7800X',
                storage: 'SSD 2 TB NVMe',
                motherboard: 'MSI MAG Z690 TOMAHAWK',
                totalPrice: 45000,
            };
        } else if (answers[2] === '20 000 - 40 000 грн') {
            config = {
                psu: '650W',
                ram: '16 GB DDR4',
                gpu: 'NVIDIA GTX 1660 Ti',
                cpu: 'Intel Core i7-12700',
                storage: 'SSD 1 TB',
                motherboard: 'Gigabyte B560M DS3H',
                totalPrice: 25000,
            };
        } else {
            config = {
                psu: '550W',
                ram: '8 GB DDR4',
                gpu: 'NVIDIA GTX 1650',
                cpu: 'Intel Core i3-10100',
                storage: 'HDD 1 TB',
                motherboard: 'ASRock B460M-HDV',
                totalPrice: 12000,
            };
        }
    }

    // Для користувачів macOS і швидкості
    if (answers[1] === 'macOS' && answers[4] === 'Швидкість') {
        config = {
            psu: '1000W Platinum Certified',
            ram: '64 GB DDR5',
            gpu: 'NVIDIA GeForce RTX 4090',
            cpu: 'Apple M2 Ultra',
            storage: 'SSD 4 TB NVMe',
            motherboard: 'Apple Silicon',
            totalPrice: 150000,
        };
    }

    // Якщо ціна потрібна для подальших обчислень
    const price = config.totalPrice;

    // Повернення конфігурації з числовою ціною
    return {
        ...config,
        totalPrice: `${price.toLocaleString()} грн`, // форматування ціни
    };
};
