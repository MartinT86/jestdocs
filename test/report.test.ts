import { reportBuilder } from "../src/reportBuilder";

describe('Given a project name', () => {
    it('should output the name in the header', () => {
        const expected = '<h1>My project</h1>'
        const projectName = 'My project'

        const actual = reportBuilder(projectName)

        expect(actual).toEqual(expected)
    });
});