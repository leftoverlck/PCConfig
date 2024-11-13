describe('головна сторінка', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('повинна завантажуватись', () => {
    cy.get('button').contains('Пройти тест').should('be.visible');
    cy.get('a[href="/login"]').contains('Увійти').should('be.visible');
    cy.get('a[href="#features"]').contains('Про нас').should('be.visible');
    cy.get('footer').should('be.visible');
    cy.get('footer p').should('contain.text', 'PCCONFIG');

    
   
    cy.get('h1').contains("Збірка комп'ютера без зайвих зусиль").should('be.visible');
    cy.get('p').contains('Твій комп\'ютер – твої правила!').should('be.visible');
    cy.get('button').contains('Почати збірку').should('be.visible');

   
    cy.get('section#features').should('be.visible');
   
  });
});

describe('основний вміст', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('повинна переходити на /login, якщо користувач не автентифікований', () => {
    cy.window().then((window) => {
      window.localStorage.setItem('isAuthenticated', 'false');
    });

    cy.get('button').contains('Почати збірку').click();

    
    cy.wait(1000); 
    cy.url().should('eq', 'http://localhost:3000/login');
  });
});

describe('Перехід на секцію "Про нас" з хедера', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('повинна прокручувати до секції "Про нас" при натисканні на лінк у хедері', () => {
    
    cy.get('a[href="#features"]').contains('Про нас').should('be.visible');
    
   
    cy.get('a[href="#features"]').click();
    
    
    cy.get('section#features').should('be.visible');
    
    
    cy.location('hash').should('eq', '#features');
  });
});
describe('Перехід на сторінку логіну', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('повинна переходити на сторінку логіну при натисканні на кнопку "Увійти"', () => {
    cy.get('a[href="/login"]').contains('Увійти').should('be.visible');
    
    cy.get('a[href="/login"]').click();
    
    cy.url().should('eq', 'http://localhost:3000/login');
  });
});
describe('Сторінка Реєстрації', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register'); 
  });

  it('повинна завантажуватись', () => {
    cy.get('h2').contains('Реєстрація').should('be.visible'); 
    cy.get('input[type="email"]').should('be.visible'); 
    cy.get('input[type="password"]').should('be.visible'); 
    cy.get('button').contains('Зареєструватись').should('be.visible'); 
  });

  it('повинна мати коректні інпути і проходити реєстрацію', () => {
    const testEmail = 't11165669@example.com';
    const testPassword = 'password123';


    cy.get('input[type="email"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);

   
    cy.get('button').contains('Зареєструватись').click();

 
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Реєстрація успішна!');
    });


    cy.window().then((win) => {
      cy.stub(win, 'alert').callsFake(() => {}); 
    });

    cy.url().should('eq', 'http://localhost:3000/profile');

    cy.wait(5000); 
    cy.get('.ProfilePage-module__newAssemblyButton').should('be.visible');

    cy.get('.ProfilePage-module__newAssemblyButton').click();

    cy.url().should('include', '/assembly');

    cy.get('.NewAssemblyPage-module__select').should('have.length', 6); // Перевірка на наявність 6 селекторів
    cy.get('.NewAssemblyPage-module__button').should('be.visible').and('contain', 'Зберегти збірку'); // Перевірка кнопки збереження
 



    cy.get('.NewAssemblyPage-module__select').first().select('Intel Core i5-11400'); // Вибір процесора
    cy.get('.NewAssemblyPage-module__select').eq(1).select('16 GB DDR4'); // Вибір RAM
    cy.get('.NewAssemblyPage-module__select').eq(2).select('Intel UHD Graphics'); // Вибір графіки
    cy.get('.NewAssemblyPage-module__select').eq(3).select('SSD 512 GB'); // Вибір SSD
    cy.get('.NewAssemblyPage-module__select').eq(4).select('MSI B460M PRO'); // Вибір материнської плати
    cy.get('.NewAssemblyPage-module__select').eq(5).select('650W'); // Вибір блоку живлення
    

   
    cy.get('.NewAssemblyPage-module__button').click();

    cy.url().should('include', '/profile');

    cy.get('.ProfilePage-module__mainContent').should('contain', 'Збірка #1');

    cy.get('.Header-module__button').click(); 
    cy.url().should('include', '/test');

    cy.get('input[name="question-0"]').check('Ігри');
        cy.get('.TestPage-module__nextButton').click();
        cy.get('input[name="question-1"]').check('Windows');
        cy.get('.TestPage-module__nextButton').click();
        cy.get('input[name="question-2"]').check('10 000 - 20 000 грн');
        cy.get('.TestPage-module__nextButton').click();
        cy.get('input[name="question-3"]').check('Дома');
        cy.get('.TestPage-module__nextButton').click();
        cy.get('input[name="question-4"]').check('Швидкість');
        cy.get('.TestPage-module__nextButton').click();
        cy.get('.TestPage-module__addConfigurationButton').should('be.visible').click();
        cy.url().should('include', '/profile');
  

        cy.get('.Header-module__navLink').eq(2).click();
        cy.url().should('include', '/login');

       
      });
});
