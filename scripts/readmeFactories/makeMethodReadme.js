import {getDocsUrl} from '../helpers';

export default (pkgName, memberName) =>
  `# ${pkgName}

This is the standalone [\`AsyncAF\`]${getDocsUrl()} package for [\`${memberName}\`]${getDocsUrl(memberName)}.

### For more information:

- check out the docs for [\`${memberName}\`]${getDocsUrl(memberName)}
- see how to make use of ${memberName} and other \`@async-af/*\` scoped packages in the docs for
   - [\`AsyncAfWrapper\`]${getDocsUrl('AsyncAfWrapper')}
   - and the [\`use\`]${getDocsUrl('use').replace('F', 'fWrapper')} method
- or for more general setup, take a look at the main [AsyncAF README](https://github.com/AsyncAF/AsyncAF/blob/master/README.md)
`;
