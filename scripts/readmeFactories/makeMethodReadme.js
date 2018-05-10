import {homepage} from '../createPackageJsons';

const makeMethodReadme = (pkgName, memberName) =>
  `# ${pkgName}

This is the standalone [\`AsyncAF\`](${homepage}) package for [\`${memberName}\`](${homepage}/AsyncAF.html#${memberName}).

### For more information:

- check out the docs for [\`${memberName}\`](${homepage}/AsyncAF.html#${memberName})
- see how to make use of ${memberName} and other \`@async-af/*\` scoped packages in the docs for
   - [\`AsyncAfWrapper\`](${homepage}/AsyncAfWrapper.html)
   - and the [\`use\`](${homepage}/AsyncAfWrapper.html#use) method
- or for more general setup, take a look at the main [AsyncAF README](https://github.com/AsyncAF/AsyncAF/blob/master/README.md)
`;

export default makeMethodReadme;
