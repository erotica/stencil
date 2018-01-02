import { getJsPathBundlePlaceholder } from '../../../util/data-serialize';
import { ModuleFiles, Bundle } from '../../../util/interfaces';


export default function bundleResolver(bundle: Bundle, moduleFiles: ModuleFiles) {
  const checkStarsWith = getJsPathBundlePlaceholder('').substr(0, 4);

  return {
    name: 'bundleResolverPlugin',

    resolveId(importee: string) {
      if (importee.startsWith(checkStarsWith)) {
        // get the js file path using the placeholder id
        return getJsFilePathByPlaceholdId(bundle, moduleFiles, importee);
      }

      return null;
    }
  };
}


function getJsFilePathByPlaceholdId(bundle: Bundle, moduleFiles: ModuleFiles, placeholderId: string) {
  // check the manifest bundle files
  let modulePlaceholderId: string;

  let moduleFile = bundle.moduleFiles.find(m => {
    if (m.cmpMeta && typeof m.jsFilePath === 'string') {
      modulePlaceholderId = getJsPathBundlePlaceholder(m.cmpMeta.tagNameMeta);
      return modulePlaceholderId === placeholderId;
    }
    return false;
  });
  if (moduleFile) {
    return moduleFile.jsFilePath;
  }

  // check all of the app's module files
  for (var key in moduleFiles) {
    moduleFile = moduleFiles[key];

    if (moduleFile.cmpMeta && typeof moduleFile.jsFilePath === 'string') {
      modulePlaceholderId = getJsPathBundlePlaceholder(moduleFile.cmpMeta.tagNameMeta);
      if (modulePlaceholderId === placeholderId) {
        return moduleFile.jsFilePath;
      }
    }
  }

  return null;
}