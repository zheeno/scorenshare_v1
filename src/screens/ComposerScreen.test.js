const ComposerScreen = require("./ComposerScreen")

// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Anas", "Jean-Philippe", "Michael"], ["Michael", "Edmond", "Jean-Philippe"], ["Jean-Philippe", "Edmond", "George"]]
        inst = new ComposerScreen.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("initComposerContentPage", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Jean-Philippe", "Anas"], ["Anas", "Anas", "Pierre Edouard"], ["Anas", "Jean-Philippe", "George"]]
        inst = new ComposerScreen.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.initComposerContentPage()
        }
    
        expect(callFunction).not.toThrow()
    })
})
