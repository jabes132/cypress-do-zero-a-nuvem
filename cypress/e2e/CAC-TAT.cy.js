const { it } = require("mocha")

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>  {
    cy.visit('./src/index.html')


  })



  it('verifica o título da aplicação', () => {
  
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longtext = Cypress._.repeat('abcdefghijklmnopqrstuvxz', 10)
    cy.get('#firstName').type('Jabes')
    cy.get('#lastName').type('Gabriel Silva')
    cy.get('#email').type('jabesgsilva@hotmail.com')
    cy.get('#open-text-area').type(longtext, { delay: 0})
    cy.get('.button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , () => {
      cy.get('#firstName').type('Jabes')
      cy.get('#lastName').type('Gabriel Silva')
      cy.get('#email').type('jabesgsilva,hotmail.com')
      cy.get('#open-text-area').type('teste')
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible')
    })

    it('valor não numérico digitado no campo telefone', () => {
      cy.get('#firstName').type('Jabes')
      cy.get('#lastName').type('Gabriel Silva')
      cy.get('#email').type('jabesgsilva@hotmail.com')
      cy.get('#phone')
        .type('teste')
          .should('have.value', '')
      cy.get('#open-text-area').type('teste')
      cy.get('.button[type="submit"]').click()
    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Jabes')
      cy.get('#lastName').type('Gabriel Silva')
      cy.get('#email').type('jabesgsilva@hotmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('teste')
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible') 
    })
    //com comando contains no button onde coloco a propriedade e o que está escrito no objeto e repasso
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Jabes')
        .should('have.value', 'Jabes')
          .clear().should('have.value', '')
      cy.get('#lastName').type('Gabriel Silva')
        .should('have.value', 'Gabriel Silva')
          .clear().should('have.value', '')
      cy.get('#email').type('jabesgsilva@hotmail.com')
        .should('have.value', 'jabesgsilva@hotmail.com')
          .clear().should('have.value', '')
      cy.get('#phone').type('31992328174')
        .should('have.value', '31992328174')
          .clear().should('have.value', '')
      cy.get('#open-text-area').type('teste')
       .should('have.value', 'teste')
          .clear().should('have.value', '')
      cy.contains('button','Enviar').click()
    })


    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible')
    })

    it('envia o formulário de sucesso usando comando customizado' , () => {
      const data = {
        firstName: 'Walmyr',
        lastName: 'Lima e Silva  Filho',
        email: 'walmyr@talkingabout.com',
        text: 'Teste.'
      }
      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get('.success').should('be.visible')
    })
      //seleção pelo texto na caixa de seleção
    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
          .should('have.value', 'youtube')
      
    })
    


    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product').select(1)
        .should('have.value', 'blog')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')//não pode ter espaço entre os colchetes
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .each(typeOfService => { //cada um marcar
          cy.wrap(typeOfService) //empacotar
          .check() //marcar
          .should('be.checked') //verificar marcado
        })
    })


    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]') //mesmo comando que radio button
        .check() //marcar
        .should('be.checked') //verificar marcado
        .last() //o último checkbox
        .uncheck() //desmarcar
        .should('not.be.checked') //verificar não estar marcado

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Jabes')
      cy.get('#lastName').type('Gabriel Silva')
      cy.get('#email').type('jabesgsilva@hotmail.com')
      cy.get('#phone-checkbox').check() //mesmo exercicio da aula 2, só mudou o click para check porque o clica ''clica'' o check clica também mas se já tver marcado, ele não desmarca
      cy.get('#open-text-area').type('teste')
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible') 
    })

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json') // não utilizar barras invertidas a esquerda \\\
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // não utilizar barras invertidas a esquerda \\\
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')

      })

    })

    it('eleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('samplefile')//apelido igual sql
      cy.get('#file-upload')
        .selectFile('@samplefile') // se coloca um arroba no apelido
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')


    })
  })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')//primeiro argumento é o da aplicação e o segundo é o texto contido
        .should('have.attr' , 'href', 'privacy.html') //que tenha o atributo href e privacy
          .and('have.attr' , 'target', '_blank')//que tenha o atributo target e blank

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr' , 'target')
          .click()

      cy.contains('H1', 'CAC TAT - Política de Privacidade').should('be.visible')

    })

    it('testa a página da política de privacidade de forma independente', () => {
      
    })
})
