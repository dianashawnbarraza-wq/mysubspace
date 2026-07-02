export type LocationInfo = {
  city: string
  region: string
  idVerificationRequired: boolean
}

const LA_ZIP_PREFIXES = ['900', '902', '903', '904', '905', '906', '907', '908', '910', '911', '912', '913', '914', '915', '916', '917', '918']

/** States where ID verification would be required in production. */
const ID_VERIFY_PREFIXES = ['701', '708', '700']

export function locationFromZip(zip: string): LocationInfo {
  const cleaned = zip.replace(/\D/g, '').slice(0, 5)
  if (!cleaned) {
    return { city: 'your area', region: '', idVerificationRequired: false }
  }

  if (LA_ZIP_PREFIXES.some((p) => cleaned.startsWith(p))) {
    return { city: 'Los Angeles', region: 'CA', idVerificationRequired: false }
  }

  if (ID_VERIFY_PREFIXES.some((p) => cleaned.startsWith(p))) {
    return { city: 'New Orleans', region: 'LA', idVerificationRequired: true }
  }

  return { city: 'your area', region: '', idVerificationRequired: false }
}

export function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, '').slice(-4)
  return `(***) ***-${digits || '0000'}`
}
