const getCorsConfig = (env: string) => {
  if (env == 'localdev') {
    return {
      origin: '*',
    }
  }
}
export default getCorsConfig;