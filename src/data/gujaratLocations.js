/**
 * Gujarat Districts → Talukas → Cities/Towns
 * Major districts with their talukas and key towns
 */

const gujaratLocations = {
  'Ahmedabad': {
    talukas: {
      'Ahmedabad City': ['Satellite', 'Prahlad Nagar', 'Vastrapur', 'Bodakdev', 'Thaltej', 'S.G. Highway', 'Bopal', 'South Bopal', 'Ambli', 'Shilaj', 'Navrangpura', 'Paldi', 'Ellis Bridge', 'C.G. Road', 'Ashram Road', 'Maninagar', 'Naranpura', 'Gota', 'Chandkheda', 'Motera', 'Memnagar', 'Gurukul', 'Drive-In', 'Sola', 'Science City', 'Nehru Nagar', 'Jodhpur', 'Vejalpur', 'Jivraj Park', 'Shahibaug', 'Ranip', 'Nikol', 'Odhav', 'Vastral', 'Naroda', 'Bapunagar'],
      'Sanand': ['Sanand', 'Ognaj', 'Tragad'],
      'Dholka': ['Dholka', 'Bavla'],
      'Dhandhuka': ['Dhandhuka'],
      'Viramgam': ['Viramgam'],
      'Detroj-Rampura': ['Detroj'],
      'Mandal': ['Mandal', 'Pethapur'],
    },
  },
  'Gandhinagar': {
    talukas: {
      'Gandhinagar': ['Gandhinagar', 'Infocity', 'GIFT City', 'Sector 21', 'Sector 7'],
      'Kalol': ['Kalol'],
      'Mansa': ['Mansa'],
      'Dehgam': ['Dehgam'],
    },
  },
  'Surat': {
    talukas: {
      'Surat City': ['Adajan', 'Vesu', 'Piplod', 'Athwa', 'Ghod Dod Road', 'Ring Road', 'Varachha', 'Katargam', 'Udhna', 'Pandesara', 'Pal', 'Dumas'],
      'Bardoli': ['Bardoli'],
      'Olpad': ['Olpad', 'Hazira'],
      'Kamrej': ['Kamrej'],
      'Choryasi': ['Choryasi'],
      'Mahuva': ['Mahuva'],
      'Mandvi': ['Mandvi'],
    },
  },
  'Vadodara': {
    talukas: {
      'Vadodara City': ['Alkapuri', 'Fatehgunj', 'Manjalpur', 'Gotri', 'Akota', 'Karelibaug', 'Waghodia Road', 'Harni', 'Sama', 'Tandalja', 'Vasna Bhayli'],
      'Padra': ['Padra'],
      'Savli': ['Savli'],
      'Karjan': ['Karjan'],
      'Dabhoi': ['Dabhoi'],
      'Waghodia': ['Waghodia'],
      'Sinor': ['Sinor'],
    },
  },
  'Rajkot': {
    talukas: {
      'Rajkot City': ['Rajkot', 'Kalawad Road', 'University Road', '150 Feet Ring Road', 'Yagnik Road', 'Pedak Road'],
      'Kotda Sangani': ['Kotda Sangani'],
      'Gondal': ['Gondal'],
      'Jetpur': ['Jetpur'],
      'Dhoraji': ['Dhoraji'],
      'Upleta': ['Upleta'],
      'Jasdan': ['Jasdan'],
      'Vinchhiya': ['Vinchhiya'],
      'Jamkandorna': ['Jamkandorna'],
      'Paddhari': ['Paddhari'],
      'Lodhika': ['Lodhika'],
    },
  },
  'Bhavnagar': {
    talukas: {
      'Bhavnagar City': ['Bhavnagar', 'Waghawadi Road', 'Ghogha Circle'],
      'Sihor': ['Sihor'],
      'Palitana': ['Palitana'],
      'Mahuva': ['Mahuva'],
      'Talaja': ['Talaja'],
      'Gariadhar': ['Gariadhar'],
      'Ghogha': ['Ghogha'],
      'Jesar': ['Jesar'],
      'Umrala': ['Umrala'],
      'Vallabhipur': ['Vallabhipur'],
    },
  },
  'Jamnagar': {
    talukas: {
      'Jamnagar City': ['Jamnagar'],
      'Dhrol': ['Dhrol'],
      'Kalavad': ['Kalavad'],
      'Lalpur': ['Lalpur'],
      'Jamjodhpur': ['Jamjodhpur'],
      'Jodia': ['Jodia'],
    },
  },
  'Junagadh': {
    talukas: {
      'Junagadh City': ['Junagadh'],
      'Visavadar': ['Visavadar'],
      'Keshod': ['Keshod'],
      'Manavadar': ['Manavadar'],
      'Vanthali': ['Vanthali'],
      'Mangrol': ['Mangrol'],
      'Mendarda': ['Mendarda'],
    },
  },
  'Kutch': {
    talukas: {
      'Bhuj': ['Bhuj', 'Madhapar', 'Gandhidham'],
      'Anjar': ['Anjar'],
      'Mandvi': ['Mandvi'],
      'Mundra': ['Mundra'],
      'Nakhtrana': ['Nakhtrana'],
      'Rapar': ['Rapar'],
      'Abdasa': ['Abdasa', 'Naliya'],
      'Lakhpat': ['Lakhpat'],
    },
  },
  'Mehsana': {
    talukas: {
      'Mehsana': ['Mehsana'],
      'Visnagar': ['Visnagar'],
      'Unjha': ['Unjha'],
      'Kadi': ['Kadi'],
      'Kheralu': ['Kheralu'],
      'Jotana': ['Jotana'],
      'Satlasana': ['Satlasana'],
      'Becharaji': ['Becharaji'],
    },
  },
  'Anand': {
    talukas: {
      'Anand': ['Anand', 'V.V. Nagar'],
      'Petlad': ['Petlad'],
      'Borsad': ['Borsad'],
      'Khambhat': ['Khambhat'],
      'Sojitra': ['Sojitra'],
      'Tarapur': ['Tarapur'],
      'Umreth': ['Umreth'],
    },
  },
  'Bharuch': {
    talukas: {
      'Bharuch': ['Bharuch'],
      'Ankleshwar': ['Ankleshwar'],
      'Jambusar': ['Jambusar'],
      'Amod': ['Amod'],
      'Hansot': ['Hansot'],
      'Vagra': ['Vagra', 'Dahej'],
      'Valia': ['Valia'],
    },
  },
  'Valsad': {
    talukas: {
      'Valsad': ['Valsad'],
      'Vapi': ['Vapi'],
      'Pardi': ['Pardi'],
      'Umbergaon': ['Umbergaon'],
      'Dharampur': ['Dharampur'],
      'Kaprada': ['Kaprada'],
    },
  },
  'Navsari': {
    talukas: {
      'Navsari': ['Navsari'],
      'Gandevi': ['Gandevi'],
      'Bilimora': ['Bilimora'],
      'Jalalpore': ['Jalalpore'],
      'Chikhli': ['Chikhli'],
      'Khergam': ['Khergam'],
    },
  },
  'Patan': {
    talukas: {
      'Patan': ['Patan'],
      'Siddhpur': ['Siddhpur'],
      'Chanasma': ['Chanasma'],
      'Harij': ['Harij'],
      'Radhanpur': ['Radhanpur'],
      'Santalpur': ['Santalpur'],
    },
  },
  'Banaskantha': {
    talukas: {
      'Palanpur': ['Palanpur'],
      'Deesa': ['Deesa'],
      'Dhanera': ['Dhanera'],
      'Tharad': ['Tharad'],
      'Vadgam': ['Vadgam'],
      'Danta': ['Danta'],
      'Amirgadh': ['Amirgadh'],
    },
  },
  'Sabarkantha': {
    talukas: {
      'Himmatnagar': ['Himmatnagar'],
      'Idar': ['Idar'],
      'Modasa': ['Modasa'],
      'Prantij': ['Prantij'],
      'Talod': ['Talod'],
      'Khedbrahma': ['Khedbrahma'],
    },
  },
  'Surendranagar': {
    talukas: {
      'Surendranagar': ['Surendranagar', 'Wadhwan'],
      'Chotila': ['Chotila'],
      'Limbdi': ['Limbdi'],
      'Dhrangadhra': ['Dhrangadhra'],
      'Halvad': ['Halvad'],
      'Thangadh': ['Thangadh'],
      'Sayla': ['Sayla'],
    },
  },
  'Amreli': {
    talukas: {
      'Amreli': ['Amreli'],
      'Rajula': ['Rajula'],
      'Savarkundla': ['Savarkundla'],
      'Babra': ['Babra'],
      'Dhari': ['Dhari'],
      'Jafrabad': ['Jafrabad'],
      'Lathi': ['Lathi'],
      'Khambha': ['Khambha'],
    },
  },
  'Porbandar': {
    talukas: {
      'Porbandar': ['Porbandar'],
      'Kutiyana': ['Kutiyana'],
      'Ranavav': ['Ranavav'],
    },
  },
  'Morbi': {
    talukas: {
      'Morbi': ['Morbi'],
      'Wankaner': ['Wankaner'],
      'Halvad': ['Halvad'],
      'Tankara': ['Tankara'],
      'Maliya': ['Maliya'],
    },
  },
  'Gir Somnath': {
    talukas: {
      'Veraval': ['Veraval', 'Somnath'],
      'Una': ['Una'],
      'Kodinar': ['Kodinar'],
      'Sutrapada': ['Sutrapada'],
      'Talala': ['Talala'],
      'Gir Gadhada': ['Gir Gadhada'],
    },
  },
  'Devbhoomi Dwarka': {
    talukas: {
      'Dwarka': ['Dwarka'],
      'Khambhalia': ['Khambhalia'],
      'Bhanvad': ['Bhanvad'],
      'Kalyanpur': ['Kalyanpur'],
    },
  },
  'Botad': {
    talukas: {
      'Botad': ['Botad'],
      'Barwala': ['Barwala'],
      'Gadhada': ['Gadhada'],
      'Ranpur': ['Ranpur'],
    },
  },
  'Narmada': {
    talukas: {
      'Rajpipla': ['Rajpipla'],
      'Dediapada': ['Dediapada'],
      'Sagbara': ['Sagbara'],
      'Tilakwada': ['Tilakwada'],
    },
  },
  'Kheda': {
    talukas: {
      'Nadiad': ['Nadiad'],
      'Kheda': ['Kheda'],
      'Kapadvanj': ['Kapadvanj'],
      'Thasra': ['Thasra'],
      'Mahudha': ['Mahudha'],
      'Kathlal': ['Kathlal'],
      'Galteshwar': ['Galteshwar'],
      'Matar': ['Matar'],
      'Mehmedabad': ['Mehmedabad'],
    },
  },
  'Panchmahal': {
    talukas: {
      'Godhra': ['Godhra'],
      'Halol': ['Halol'],
      'Kalol': ['Kalol'],
      'Jambughoda': ['Jambughoda'],
      'Shehera': ['Shehera'],
      'Morva Hadaf': ['Morva Hadaf'],
    },
  },
  'Dahod': {
    talukas: {
      'Dahod': ['Dahod'],
      'Limkheda': ['Limkheda'],
      'Devgadh Baria': ['Devgadh Baria'],
      'Dhanpur': ['Dhanpur'],
      'Jhalod': ['Jhalod'],
      'Fatepura': ['Fatepura'],
      'Garbada': ['Garbada'],
      'Sanjeli': ['Sanjeli'],
    },
  },
  'Mahisagar': {
    talukas: {
      'Lunawada': ['Lunawada'],
      'Santrampur': ['Santrampur'],
      'Kadana': ['Kadana'],
      'Khanpur': ['Khanpur'],
      'Balasinor': ['Balasinor'],
      'Virpur': ['Virpur'],
    },
  },
  'Tapi': {
    talukas: {
      'Vyara': ['Vyara'],
      'Songadh': ['Songadh'],
      'Uchchhal': ['Uchchhal'],
      'Nizar': ['Nizar'],
      'Valod': ['Valod'],
      'Dolvan': ['Dolvan'],
    },
  },
  'Dang': {
    talukas: {
      'Ahwa': ['Ahwa'],
      'Subir': ['Subir'],
      'Waghai': ['Waghai'],
    },
  },
  'Aravalli': {
    talukas: {
      'Modasa': ['Modasa'],
      'Shamlaji': ['Shamlaji'],
      'Bhiloda': ['Bhiloda'],
      'Dhansura': ['Dhansura'],
      'Bayad': ['Bayad'],
      'Meghraj': ['Meghraj'],
    },
  },
  'Chhota Udepur': {
    talukas: {
      'Chhota Udepur': ['Chhota Udepur'],
      'Bodeli': ['Bodeli'],
      'Sankheda': ['Sankheda'],
      'Jetpur Pavi': ['Jetpur Pavi'],
      'Kavant': ['Kavant'],
      'Nasvadi': ['Nasvadi'],
    },
  },
}

export function getDistricts() {
  return Object.keys(gujaratLocations).sort()
}

export function getTalukas(district) {
  if (!district || !gujaratLocations[district]) return []
  return Object.keys(gujaratLocations[district].talukas).sort()
}

export function getCities(district, taluka) {
  if (!district || !taluka || !gujaratLocations[district]?.talukas[taluka]) return []
  return gujaratLocations[district].talukas[taluka].sort()
}

export default gujaratLocations
